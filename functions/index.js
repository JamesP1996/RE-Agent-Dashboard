const functions = require("firebase-functions");
const { signup, login ,uploadImage} = require("./handlers/users");
const {getAllNotes,getNote,deleteNote,postNewNote,updateNote} = require("./handlers/notes");
const FBAuth = require("./utilities/FBAuth");

const app = require("express")();


// --NOTES ROUTES--
app.get("/notes", getAllNotes);
app.get("/notes/:noteID",getNote);
app.delete('/notes/:noteID', FBAuth, deleteNote);

app.post("/notes",FBAuth,postNewNote);

app.put('/notes/:noteID',FBAuth,updateNote);


// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);
app.post('/user/image',FBAuth,uploadImage);

// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region('europe-west2').https.onRequest(app);
