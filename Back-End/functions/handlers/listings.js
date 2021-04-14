/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
const { db, admin } = require("../utilities/admin");

const config = require("../utilities/config");
const { v4: uuid } = require("uuid");
const { validateListingData } = require("../utilities/validators");

exports.getAllListings = (req, res) => {
  db.collection("listings")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let listings = [];
      data.forEach((doc) => {
        if (doc.data().userHandle === req.user.handle) {
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
            imageUrl: doc.data().imageUrl,
          });
        }
      });
      return res.json(listings);
    })
    .catch((err) => console.error(err));
};

exports.postNewListing = (req, res) => {
  const noImg = "no-listing-img.png";
  const newListing = {
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
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  const { valid, errors } = validateListingData(newListing);
  if (!valid) return res.status(400).json(errors);

  db.collection("listings")
    .add(newListing)
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
      return res.json(listingData);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: err.code });
    });

  return false;
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
      return res;
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).json({ error: err.code });
    });
};

exports.updateListing = (req, res) => {
  const document = db.doc(`/listings/${req.params.listingID}`);

  const { valid, errors } = validateListingData(req.body);
  if (!valid) return res.status(400).json(errors);
  document.get().then((doc) => {
    if (!doc.exists) {
      return res.status(404).json({ error: "Listing not found" });
    }
    if (doc.data().userHandle !== req.user.handle) {
      return res.status(403).json({ error: "Unauthorized" });
    } else {
      document
        .set({
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
          imageUrl: req.body.imageUrl,
          userHandle: req.user.handle,
          createdAt: new Date().toISOString(),
        })
        .then(() => {
          res.json("Listing updated Successfully");
          return res;
        })
        .catch((err) => {
          console.log(err);
          return res.status(500).json({ error: err.code });
        });
    }
    return false;
  });
  return false;
};

exports.uploadListingImage = (req, res) => {
  const BusBoy = require("busboy");
  const path = require("path");
  const os = require("os");
  const fs = require("fs");

  const busboy = new BusBoy({ headers: req.headers });

  let rand = `${Math.round(Math.random() * 1000000)}`;
  let imageFileName;
  let imageToBeUploaded = {};
  let generatedToken = uuid();

  busboy.on("file", (fieldname, file, filename, encoding, mimetype) => {
    console.log(filename, mimetype);
    if (mimetype !== "image/jpeg" && mimetype !== "image/png") {
      return res
        .status(400)
        .json({
          error: "Wrong File Type Uploaded! -- Only Accepts PNG/JPEG/JPG",
        });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    imageFileName = `${rand}.${imageExtension}`;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
    return false;
  });
  busboy.on("finish", () => {
    admin
      .storage()
      .bucket()
      .upload(imageToBeUploaded.filepath, {
        resumable: false,
        metadata: {
          metadata: {
            contentType: imageToBeUploaded.mimetype,
            firebaseStorageDownloadTokens: generatedToken,
          },
        },
      })
      .then(() => {
        const imageUrl = `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${imageFileName}?alt=media&token=${generatedToken}`;
        return db.doc(`/listings/${req.params.listingID}`).update({ imageUrl });
      })
      .then(() => {
        return res.json({ message: "Image uploaded successfully" });
      })
      .catch((err) => {
        console.error(err);
        return res
          .status(500)
          .json({ error: `something went wrong: ${err.code}` });
      });
  });
  busboy.end(req.rawBody);
};
