const functions = require("firebase-functions");

const Authorization = require("./utilities/FBAuth");

const { signup, login ,uploadImage} = require("./handlers/users");
const {getAllNotes} = require("../functions/handlers/notes");
const {postNewNote } = require("./handlers/notes");
const FBAuth = require("./utilities/FBAuth");

const app = require("express")();


// --NOTES ROUTES--
app.get("/notes", getAllNotes);
app.post("/notes",Authorization,postNewNote);


// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);
app.post('/user/image',FBAuth,uploadImage);

// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region('europe-west2').https.onRequest(app);
