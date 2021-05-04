/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
/* eslint-disable promise/catch-or-return */
const { db } = require("../utilities/admin");
const {validateCalendarData} = require("../utilities/validators");

// Get all the Calendar Entries by the current User
exports.getAllCalendarEntries = (req, res) => {
  db.collection("calendars")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let calendars = [];

      data.forEach((doc) => {
        if (doc.data().userHandle === req.user.handle) {
          calendars.push({
            id: doc.id,
            title: doc.data().title,
            description: doc.data().description,
            start: doc.data().start,
            end: doc.data().end,
            allDay: doc.data().allDay,
            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
          });
        }
      });

      return res.json(calendars);
    })
    .catch((err) => console.error(err));
};

// Post a New Calendar under the current user
exports.postNewCalendar = (req, res) => {
  const newCalendars = {
    title: req.body.title,
    description: req.body.description,
    start: req.body.start,
    end: req.body.end,
    allDay: req.body.allDay,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  const {valid,errors} = validateCalendarData(newCalendars);
  if(!valid) return res.status(400).json(errors);

  db.collection("calendars")
    .add(newCalendars)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return res;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });

  return false;
};

// Get a calendar entry
exports.getCalendar = (req, res) => {
  let calendarData = {};
  db.doc(`/calendars/${req.params.calendarID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "calendar not found" });
      }
      calendarData = doc.data();
      calendarData.calendarID = doc.calendarID;
      return db
        .collection("calendars")
        .where("calendarID", "==", req.params.calendarID)
        .get();
    })
    .then((data) => {
      return res.json(calendarData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

// Delete the Calendar Entry if the user owns it
exports.deleteCalendar = (req, res) => {
  const document = db.doc(`/calendars/${req.params.calendarID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "calendar not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "calendar deleted successfully" });
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

// Update a Calendar Entry
exports.updateCalendar = (req, res) => {
  const document = db.doc(`/calendars/${req.params.calendarID}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "calendar not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          title: req.body.title,
          description: req.body.description,
          start: req.body.start,
          end: req.body.end,
          allDay: req.body.allDay,
          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("calendar updated Successfully");
          return res;
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
      return false;
    }
  });
};
