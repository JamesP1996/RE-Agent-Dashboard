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
  uploadListingImage,
  imageDelete
} = require("./handlers/listings");
const {
  getAllTodos,
  postNewTodo,
  deleteTodo
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
  getAttendeeDetails,
  deleteAttendee,
  updateAttendee,
  MarkAsContacted,
  MarkAsInterested,
  MarkAsUninterested
} = require("./handlers/attendees");

const FBAuth = require("./utilities/FBAuth");

const app = require("express")();
const cors = require('cors');
// Automatically allow cross-origin requests
app.use(cors({ origin: true }));


// --NOTES ROUTES--
app.get("/notes", FBAuth, getAllNotes);
app.get("/notes/:noteID", getNote);
app.delete("/notes/:noteID", FBAuth, deleteNote);
app.post("/notes", FBAuth, postNewNote);
app.put("/notes/:noteID", FBAuth, updateNote);

// --TODO's ROUTES--
app.get("/todos",FBAuth, getAllTodos);
app.delete("/todos/:todoID", FBAuth, deleteTodo);
app.post("/todos", FBAuth, postNewTodo);

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
app.put("/listings/image/:listingID", FBAuth, uploadListingImage);

// -- OPEN-HOUSES ROUTES --
app.get("/open_houses", FBAuth, getAllHouses);
app.get("/open_houses/:houseID", getHouse);
app.delete("/open_houses/:houseID", FBAuth, deleteHouse);
app.post("/open_houses", FBAuth, postNewHouse);
app.put("/open_houses/:houseID", FBAuth, updateHouse);
app.put("/open_houses/image/:houseID", FBAuth, uploadHouseImage);

// -- ATTENDEES ROUTES --
app.get("/attendees/:houseID", FBAuth, getAllAttendees);
app.get("/attendee/:attendeeID", FBAuth, getAttendeeDetails);
app.delete("/attendees/:attendeeID", FBAuth, deleteAttendee);
app.post("/attendees/:houseID", FBAuth, postAttendee);
app.put("/attendees/:attendeeID", FBAuth, updateAttendee);
app.put("/attendees/interest/:attendeeID",FBAuth,MarkAsInterested);
app.put("/attendees/uninterest/:attendeeID",FBAuth,MarkAsUninterested);
app.put("/attendees/contacted/:attendeeID",FBAuth,MarkAsContacted);


// --USER ROUTES--
app.post("/signup", signup);
app.post("/login", login);
app.get('/user', FBAuth, getAuthenticatedUser);


// Exporting the Express App that contains all the routes needed
// Uses the Firebase Functions Region of Europe Currently
exports.api = functions.region("europe-west2").https.onRequest(app);
