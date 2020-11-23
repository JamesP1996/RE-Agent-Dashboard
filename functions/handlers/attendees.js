const { db } = require("../utilities/admin");

exports.getAllAttendees = (req, res) => {
  db.collection("open_house_attendees")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let attendees = [];
      data.forEach((doc) => {
        attendees.push({
          attendeeID: doc.id,
          full_Name: doc.data().full_Name,
          number: doc.data().number,
          email: doc.data().email,
          contacted: doc.data().contacted,
          interested: doc.data().interested,

          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(attendees);
    })
    .catch((err) => console.error(err));
};

exports.postAttendee = (req, res) => {
  if (req.body.Description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newAttendee = {
    attendeeID: req.body.attendeeID,
    full_Name: req.body.full_Name,
    number: req.body.number,
    email: req.body.email,
    contacted: req.body.contacted,
    interested: req.body.interested,

    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("open_house_attendees")
    .add(newAttendee)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getAttendee = (req, res) => {
  let attendeeData = {};
  db.doc(`/open_house_attendees/${req.params.attendeeID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Attendee not found" });
      }
      attendeeData = doc.data();
      attendeeData.attendeeID = doc.attendeeID;
      return db
        .collection("open_house_attendees")
        .where("attendeeID", "==", req.params.attendeeID)
        .get();
    })
    .then((data) => {
      return res.json(attendeeID);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteAttendee = (req, res) => {
  const document = db.doc(`/open_house_attendees/${req.params.attendeeID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Attendee not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Attendee deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateHouse = (req, res) => {
  const document = db.doc(`/open_house_attendees/${req.params.attendeeID}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          attendeeID: req.body.attendeeID,
          full_Name: req.body.full_Name,
          number: req.body.number,
          email: req.body.email,
          contacted: req.body.contacted,
          interested: req.body.interested,
      
          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("Attendee updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
  });
};
