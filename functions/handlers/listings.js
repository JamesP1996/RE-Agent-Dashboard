const { db } = require("../utilities/admin");

exports.getAllListings = (req, res) => {
  db.collection("listings")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let listings = [];
      data.forEach((doc) => {
        listings.push({
          listingID: doc.id,
          owners: doc.data().owners,
          sqft: doc.data().sqft,
          sqft_Lot: doc.data().sqft_lot,
          address: doc.data().address,
          price: doc.data().price,

          style: doc.data().style,
          stories: doc.data().stories,
          bedrooms: doc.data().bedrooms,
          bathrooms: doc.data().bathrooms,
          cooling: doc.data().cooling,
          heating: doc.data().heating,
          parking: doc.data().parking,
          basement: doc.data().basement,
          other_Features: doc.data().other_features,

          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(open_houses);
    })
    .catch((err) => console.error(err));
};

exports.postNewListing = (req, res) => {
  if (req.body.Description.trim() === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }

  const newListing = {
    listingID: req.body.listingID,
    owners: req.body.owners,
    sqft: req.body.sqft,
    sqft_Lot: req.body.sqft_Lot,
    address: req.body.address,
    price: req.body.price,

    style: req.body.style,
    stories: req.body.stories,
    bedrooms: req.body.bedrooms,
    bathrooms: req.body.bathrooms,
    cooling: req.body.cooling,
    heating: req.body.heating,
    parking: req.body.parking,
    basement: req.body.basement,
    other_features: req.body.other_Features,

    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("listings")
    .add(newListing)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
};

exports.getListing = (req, res) => {
  let listingData = {};
  db.doc(`/listings/${req.params.listingID}`)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Listing not found" });
      }
      listingData = doc.data();
      listingData.listingID = doc.listingID;
      return db
        .collection("listings")
        .where("listingID", "==", req.params.listingID)
        .get();
    })
    .then((data) => {
      return res.json(listingID);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });
};

exports.deleteListing = (req, res) => {
  const document = db.doc(`/listings/${req.params.listingID}`);
  document
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ error: "Listing not found" });
      }
      if (doc.data().userHandle !== req.user.handle) {
        return res.status(403).json({ error: "Unauthorized" });
      } else {
        return document.delete();
      }
    })
    .then(() => {
      res.json({ message: "Listing deleted successfully" });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateListing = (req, res) => {
  const document = db.doc(`/listings/${req.params.listingID}`);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Listing not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
          listingID: req.body.listingID,
          owners: req.body.owners,
          sqft: req.body.sqft,
          sqft_Lot: req.body.sqft_Lot,
          address: req.body.address,
          price: req.body.price,

          style: req.body.style,
          stories: req.body.stories,
          bedrooms: req.body.bedrooms,
          bathrooms: req.body.bathrooms,
          cooling: req.body.cooling,
          heating: req.body.heating,
          parking: req.body.parking,
          basement: req.body.basement,
          other_features: req.body.other_Features,

          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("Listing updated Successfully");
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
  });
};
