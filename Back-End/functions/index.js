const functions = require("firebase-functions");
const { signup, login, uploadImage , getAuthenticatedUser } = require("./handlers/users");
const {
  getAllNotes,
  getNote,
  deleteNote,
  postNewNote,
  updateNote,
} = require("./handlers/notes");
const {
  updateListing,
  deleteListing,
  getListing,
  postNewListing,
  getAllListings,
  uploadListingImage
} = require("./handlers/listings");
const {
  getAllTodos,
  postNewTodo,
  getTodo,
  deleteTodo,
  updateTodo,
} = require("./handlers/todos");

const {
  getAllCalendarEntries,
  postNewCalendar,
  getCalendar,
  deleteCalendar,
  updateCalendar,
} = require("./handlers/calendar");

const {
  getAllHouses,
  postNewHouse,
  getHouse,
  deleteHouse,
  updateHouse,
  uploadHouseImage
} = require("./handlers/open_houses");

const {
  getAllAttendees,
  postAttendee,
  getAttendee,
  deleteAttendee,
  updateAttendee,
} = require("./handlers/attendees");

const FBAuth = require("./utilities/FBAuth");

const app = require("express")();

// --NOTES ROUTES--
app.get("/notes", FBAuth, getAllNotes);
app.get("/notes/:noteID", getNote);
app.delete("/notes/:noteID", FBAuth, deleteNote);
app.post("/notes", FBAuth, postNewNote);
app.put("/notes/:noteID", FBAuth, updateNote);

// --TODO's ROUTES--
app.get("/todos",FBAuth, getAllTodos);
app.get("/todos/:todoID", getTodo);
app.delete("/todos/:todoID", FBAuth, deleteTodo);
app.post("/todos", FBAuth, postNewTodo);
app.put("/todos/:todoID", FBAuth, updateTodo);

// --CALENDAR ROUTES --
app.get("/calendars", FBAuth, getAllCalendarEntries);
app.get("/calendars/:calendarID", getCalendar);
app.delete("/calendars/:calendarID", FBAuth, deleteCalendar);
app.post("/calendars", FBAuth, postNewCalendar);
app.put("/calendars/:calendarID", FBAuth, updateCalendar);

// --LISTING ROUTES--
app.get("/listings", FBAuth, getAllListings);
app.get("/listings/:listingID", getListing);
app.delete("/listings/:listingID", FBAuth, deleteListing);
app.post("/listings", FBAuth, postNewListing);
app.put("/listings/:listingID", FBAuth, updateListing);
app.post("/listings/image", FBAuth, uploadListingImage);

// -- OPEN-HOUSES ROUTES --
app.get("/open_houses", FBAuth, getAllHouses);
app.get("/open_houses/:houseID", getHouse);
app.delete("/open_houses/:houseID", FBAuth, deleteHouse);
app.post("/open_houses", FBAuth, postNewHouse);
app.put("/open_houses/:houseID", FBAuth, updateHouse);
app.post("/open_houses/image/:houseID", FBAuth, uploadHouseImage);

// -- ATTENDEES ROUTES --
app.get("/attendees", FBAuth, getAllAttendees);
app.get("/attendees/:attendeeID", getAttendee);
app.delete("/attendees/:attendeeID", FBAuth, deleteAttendee);
app.post("/attendees", FBAuth, postAttendee);
app.put("/attendees/:attendeeID", FBAuth, updateAttendee);

// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);
app.post("/user/image", FBAuth, uploadImage);
app.get('/user', FBAuth, getAuthenticatedUser);


// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region("europe-west2").https.onRequest(app);
