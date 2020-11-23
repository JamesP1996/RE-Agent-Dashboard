const { db } = require("../utilities/admin");

exports.getAllHouses = (req, res) => {
  db.collection("open_houses")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let open_houses = [];
      data.forEach((doc) => {
        open_houses.push({
          houseID: doc.id,
          property_Name: doc.data().Title,
          sqft: doc.data().sqft,
          sqft_Lot: doc.data().sqft_lot,
          address: doc.data().address,
          date: doc.data().date,
          sellers_Names: doc.data().sellers_Names,
          price: doc.data().price,
          attendees: doc.data().attendees,

          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(open_houses);
    })
    .catch((err) => console.error(err));
};

exports.postNewHouse = (req, res) => {
  if (req.body.Description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newHouse = {
    houseID: req.body.houseID,
    property_Name: req.body.property_Name,
    sqft: req.body.sqft,
    sqft_Lot: req.body.sqft_Lot,
    address: req.body.address,
    date: req.body.date,
    sellers_Names: req.body.sellers_Names,
    price: req.body.price,
    attendees: req.body.attendees,

    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("open_houses")
    .add(newHouse)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getHouse = (req, res) => {
  let houseData = {};
  db.doc(`/open_houses/${req.params.houseID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "House not found" });
      }
      houseData = doc.data();
      houseData.houseID = doc.houseID;
      return db
        .collection("open_houses")
        .where("houseID", "==", req.params.houseID)
        .get();
    })
    .then((data) => {
      return res.json(houseID);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteHouse = (req, res) => {
  const document = db.doc(`/open_houses/${req.params.houseID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "House not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "House deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateHouse = (req, res) => {
  const document = db.doc(`/open_houses/${req.params.houseID}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "House not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          houseID: req.body.houseID,
          property_Name: req.body.property_Name,
          sqft: req.body.sqft,
          sqft_Lot: req.body.sqft_Lot,
          address: req.body.address,
          date: req.body.date,
          sellers_Names: req.body.sellers_Names,
          price: req.body.price,
          attendees: req.body.attendees,

          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("House updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
  });
};
