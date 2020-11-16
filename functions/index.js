const functions = require("firebase-functions");
const admin = require("firebase-admin");

const config = {
  apiKey: "AIzaSyA9XbXYjAlgalSifIKaEzqaPNunDjrVfYw",
  authDomain: "re-agent-dashboard-22410.firebaseapp.com",
  databaseURL: "https://re-agent-dashboard-22410.firebaseio.com",
  projectId: "re-agent-dashboard-22410",
  storageBucket: "re-agent-dashboard-22410.appspot.com",
  messagingSenderId: "71090523886",
  appId: "1:71090523886:web:08ac507e8943b7de71edff",
  measurementId: "G-EXJ2NS6ZNN",
};

// Create and Deploy Your First Cloud Functions 1HR 5 MINS
// https://firebase.google.com/docs/functions/write-firebase-functions

admin.initializeApp();

const express = require("express");
const { user } = require("firebase-functions/lib/providers/auth");

const app = express();

const firebase = require("firebase").default;
firebase.initializeApp(config);

const db = admin.firestore();

// Get all Notes
app.get("/Notes", (req, res) => {
  db.collection("Notes")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let notes = [];
      data.forEach((doc) => {
        notes.push({
          noteID: doc.id,
          Title: doc.data().Title,
          Description: doc.data().Description,
          userHandle: doc.data().userHandle,
          createdAt: doc.data().createdAt,
        });
      });
      return res.json(notes);
    })
    .catch((err) => console.error(err));
});

app.post("/Notes", (req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({ error: "Using GET request on wrong Route!" });
  }
  const newNotes = {
    Title: req.body.Title,
    Description: req.body.Description,
    userHandle: req.body.userHandle,
    createdAt: new Date().toISOString(),
  };

  db.collection("Notes")
    .add(newNotes)
    .then((doc) => {
      res.json({ message: `document ${doc.id} created successfully` });
      return null;
    })
    .catch((err) => {
      res.status(500).json({ error: "Something went wrong." });
      console.log(err);
    });
});

// Sign UP Route
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    handle: req.body.handle,
  };

  let token, userId;
  db.doc(`/users/${newUser.handle}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res.status(400).json({ handle: "This Handle is already taken" });
      } else {
        return firebase
          .auth()
          .createUserWithEmailAndPassword(newUser.email, newUser.password);
      }
    })
    .then((data) => {
      userId = data.user.uid;
      return data.user.getIdToken();
    })
    .then((idToken) => {
      token = idToken;
      const userCredentials = {
        handle: newUser.handle,
        email: newUser.email,
        createdAt: new Date().toISOString(),
        userID: userId,
      };
      return db.doc(`/users/${newUser.handle}`).set(userCredentials);
    })
    .then(() => {
      return res.status(201).json({ token });
    })
    .catch((err) => {
      if (err.code === "auth/email-already-in-use") {
        return res.status(400).json({ email: "Email already in use!" });
      }
      console.log(err);
      return res.status(500).json({ error: err.code });
    });
});

//Exporting the Express App that contains all the routes needed.
exports.api = functions.region("europe-west2").https.onRequest(app);
