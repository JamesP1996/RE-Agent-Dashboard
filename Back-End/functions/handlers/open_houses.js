/* eslint-disable promise/no-nesting */
/* eslint-disable promise/catch-or-return */
/* eslint-disable promise/always-return */
/* eslint-disable consistent-return */

const { db, admin } = require("../utilities/admin");

const config = require("../utilities/config");
const { v4: uuid } = require("uuid");

exports.getAllHouses = (req, res) => {
  db.collection("open_houses")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let open_houses = [];

      data.forEach((doc) => {
        if (doc.data().userHandle === req.user.handle) {
          open_houses.push({
            houseID: doc.id,
            property_Name: doc.data().property_Name,
            sqft: doc.data().sqft,
            sqft_Lot: doc.data().sqft_lot,
            address: doc.data().address,
            date: doc.data().date,
            sellers_Names: doc.data().sellers_Names,
            price: doc.data().price,
            attendees: doc.data().attendees,

            userHandle: doc.data().userHandle,
            createdAt: doc.data().createdAt,
            imageUrl: doc.data().imageUrl,
          });
        }
      });

      return res.json(open_houses);
    })
    .catch((err) => console.error(err));
};

exports.postNewHouse = (req, res) => {
  if (req.body.property_Name === "") {
    return res.status(400).json({ body: "Body must not be empty" });
  }
  const noImg = "no-house-img.png";
  const newHouse = {
    property_Name: req.body.property_Name,
    sqft: req.body.sqft,
    sqft_Lot: req.body.sqft_Lot,
    address: req.body.address,
    date: req.body.date,
    sellers_Names: req.body.sellers_Names,
    price: req.body.price,
    attendees: req.body.attendees,
    imageUrl: `https://firebasestorage.googleapis.com/v0/b/${config.storageBucket}/o/${noImg}?alt=media`,
    userHandle: req.user.handle,
    createdAt: new Date().toISOString(),
  };

  db.collection("open_houses")
    .add(newHouse)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return res;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
  
   if(req.body.imageUrl !== null){
     try{
      this.uploadHouseImage(this.req , this.res);
     }
     catch(error){
       console.log(error);
     }
   }
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
      return res.json(houseData);
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
      return res;
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

exports.uploadHouseImage = (req, res) => {
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
        .json({ error: "Wrong File Type Uploaded!\nOnly Accepts PNG/JPEG" });
    }
    const imageExtension = filename.split(".")[filename.split(".").length - 1];

    imageFileName = `${rand}.${imageExtension}`;

    const filepath = path.join(os.tmpdir(), imageFileName);
    imageToBeUploaded = { filepath, mimetype };
    file.pipe(fs.createWriteStream(filepath));
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
        return db.doc(`/open_houses/${req.params.houseID}`).update({ imageUrl });
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
