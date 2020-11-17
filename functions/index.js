const functions = require("firebase-functions");

const Authorization = require("./utilities/FBAuth");

const { signup, login } = require("./handlers/users");
const {getAllNotes} = require("../functions/handlers/notes");
const {postNewNote } = require("./handlers/notes");

const app = require("express")();


// --NOTES ROUTES--
app.get("/notes", getAllNotes);
app.post("/notes",Authorization,postNewNote);


// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);

// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region('europe-west2').https.onRequest(app);
