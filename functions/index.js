const functions = require("firebase-functions");

const { getAllNotes } = require("./handlers/notes");
const { postNewNote } = require("./handlers/notes");

const { FBAuth } = require("./utilities/FBAuth");

const { signup, login } = require("./handlers/users");

const express = require("express");

const app = express();

const firebase = require("firebase").default;
firebase.initializeApp(config);

// --NOTES ROUTES--
app.get("/notes", getAllNotes);
app.post("/notes", FBAuth, postNewNote);

// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);

// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region("europe-west2").https.onRequest(app);
