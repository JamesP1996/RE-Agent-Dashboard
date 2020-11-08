const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send("Hello World!");
});

exports.getNotes = functions.https.onRequest((req, res) => {
  admin
    .firestore()
    .collection("Notes")
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push(doc.data());
      });
      return res.json(notes);
    })
    .catch((err) => console.error(err));
});

exports.createNotes = functions.https.onRequest((req, res) => {
    if(req.method !== 'POST'){
        return res.status(400).json(
            {error: 'Using GET request on wrong Route!'});
    }
  const newNotes = {
    Title: req.body.Title,
    Description: req.body.Description,
    userHandle: req.body.userHandle,
    createdAt: admin.firestore.Timestamp.fromDate(new Date()),
  };

  admin.firestore().collection("Notes")
  .add(newNotes)
  .then(doc => {
      res.json({message: `document ${doc.id} created successfully`})
  })
  .catch(err => {
      res.status(500).json({error: 'Something went wrong.'});
      console.log(err);
  });
});
