/* eslint-disable consistent-return */
/* eslint-disable promise/no-nesting */
/* eslint-disable promise/always-return */
const { db } = require("../utilities/admin");
const {validateAttendeeData} = require("../utilities/validators");

exports.getAllAttendees = (req, res) => {
  db.collection("attendees")
    .orderBy("createdAt", "desc")
    .where('houseID', '==', req.params.houseID)
    .get()
    .then((data) => {
      let attendees = [];
      data.forEach((doc) => {
        if(doc.data().userHandle === req.user.handle)
        {
        attendees.push({
          attendeeID: doc.id,
          full_Name: doc.data().full_Name,
          number: doc.data().number,
          email: doc.data().email,
          contacted: doc.data().contacted,
          interested: doc.data().interested,

          houseID: doc.data.houseID,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      }
      });
      return res.json(attendees);
    })
    .catch((err) => console.error(err));
};

exports.getAttendeeDetails = (req, res) => {

  let attendeeData = {};
  db.doc(`/attendees/${req.params.attendeeID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Attendee not found" });
      }
      attendeeData = doc.data();
      attendeeData.attendeeID = doc.attendeeID;
      return db
        .collection("attendees")
        .where("attendeeID", "==", req.params.attendeeID)
        .get();
    })
    .then((data) => {
      return res.json(attendeeData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.postAttendee = (req, res) => {

  const newAttendee = {
    full_Name: req.body.full_Name,
    number: req.body.number,
    email: req.body.email,
    contacted: false,
    interested: false,

    houseID: req.params.houseID,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };
  
  const { valid, errors } = validateAttendeeData(newAttendee);
  if (!valid) return res.status(400).json(errors);

  db.collection("attendees")
    .add(newAttendee)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return res.json;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
    return null;
};
exports.deleteAttendee = (req, res) => {
  const document = db.doc(`/attendees/${req.params.attendeeID}`);
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
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateAttendee = (req, res) => {
  const document = db.doc(`/attendees/${req.params.attendeeID}`);

  const { valid, errors } = validateAttendeeData(req.body);
  if (!valid) return res.status(400).json(errors);

  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Attendee not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          full_Name: req.body.full_Name,
          number: req.body.number,
          email: req.body.email,
          contacted: req.body.contacted,
          interested: req.body.interested,
          
          houseID: req.body.houseID,
          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("Attendee updated Successfully");
          return res;
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
  }).catch((err)=>{
    return console.log(err);
  });
  return false;
};
