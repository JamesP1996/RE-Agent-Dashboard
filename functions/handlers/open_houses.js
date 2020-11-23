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
    houseID: doc.id,
    property_Name: doc.data().Title,
    sqft: doc.data().sqft,
    sqft_Lot: doc.data().sqft_lot,
    address: doc.data().address,
    date: doc.data().date,
    sellers_Names: doc.data().sellers_Names,
    price: doc.data().price,
    attendees: doc.data().attendees,

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
