const { db } = require("../utilities/admin");

exports.getAllCalenderEntries = (req, res) => {
  db.collection("calender")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let calender = [];
      data.forEach((doc) => {
        calenders.push({
          calenderID: doc.id,
          Title: doc.data().Title,
          Description: doc.data().Description,
          Date: doc.data().Date,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(calenders);
    })
    .catch((err) => console.error(err));
};

exports.postNewcalender = (req, res) => {
  if (req.body.Description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newcalenders = {
    Title: req.body.Title,
    Description: req.body.Description,
    Date: req.body.Date,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("calenders")
    .add(newcalenders)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getcalender = (req, res) => {
  let calenderData = {};
  db.doc(`/calenders/${req.params.calenderID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "calender not found" });
      }
      calenderData = doc.data();
      calenderData.calenderID = doc.calenderID;
      return db
        .collection("calenders")
        .where("calenderID", "==", req.params.calenderID)
        .get();
    })
    .then((data) => {
      return res.json(calenderData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deletecalender = (req, res) => {
  const document = db.doc(`/calenders/${req.params.calenderID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "calender not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "calender deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.upDatecalender = (req, res) => {
  const document = db.doc(`/calenders/${req.params.calenderID}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "calender not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          Title: req.body.Title,
          Description: req.body.Description,
          Date: req.body.Date,
          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("calender upDated Successfully");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
  });
};
