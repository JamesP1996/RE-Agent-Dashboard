import "./App.css";
// Module Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Utilities
// Route for Grabbing User ID and Ensuring User has a Token
import AuthRoute from "./util/AuthRoute";
import DrawerResponsive from "./components/Drawer/DrawerResponsive";

// MUI
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { deepPurple } from "@material-ui/core/colors";

// User Routes
import signup from "./pages/signup";
import login from "./pages/login";

// Home Route
import home from "./pages/home";

// Component Imports
// Notes Routes
import Notes from "./components/Notes/Notes";
import CreateNote from "./components/Notes/CreateNote";
import EditNote from "./components/Notes/EditNote";
// Todo Routes
import Todos from "./components/Todos/Todos";
import CreateTodo from "./components/Todos/CreateTodo";
// Calendar Routes
import GetCalendar from "./components/Calendars/GetCalendar";
import CreateCalendar from "./components/Calendars/CreateCalendar";
// Open_House Routes
import Houses from "./components/Open_House/Houses";
import CreateHouse from "./components/Open_House/CreateHouse";
import OpenHouseView from "./components/Open_House/OpenHouseView";
import EditOpenHouse from "./components/Open_House/EditOpenHouse";
// Listing Routes
import GetListings from "./components/Listings/GetListings";
import CreateListing from "./components/Listings/CreateListing";
import ListingView from "./components/Listings/ListingView";
// Attendees Routes
import GetAttendees from "./components/Attendees/GetAttendees";
import CreateAttendee from "./components/Attendees/CreateAttendee";

import EditAttendee from "./components/Attendees/EditAttendee";
import EditListing from "./components/Listings/EditListing";
import CalendarList from "./components/Calendars/CalendarList";
import EditCalendar from "./components/Calendars/EditCalendar";

// Token Handling
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = "/login";
    authenticated = false;
  } else {
    authenticated = true;
    axios.defaults.headers.common["Authorization"] = token;
  }
}

const signout = () => {
  try {
    localStorage.clear();
    authenticated = false;
    axios.defaults.headers.common["Authorization"] = null;
  } catch (err) {
    console.log(err);
  }
  window.location.replace("/login");
  return null;
};

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: deepPurple[500],
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: "#f44336",
    },
    typography: {
      fontFamily: 'Quicksand',
    },
    // Used by `getContrastText()` to maximize the contrast between
    // the background and the text.
    contrastThreshold: 3,
    // Used by the functions below to shift a color's luminance by approximately
    // two indexes within its tonal palette.
    // E.g., shift from Red 500 to Red 300 or Red 700.
    tonalOffset: 0.2,
  },
});

function App() {
  return (
    <div className="App">
      {/* <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
      /> */}
      <ThemeProvider theme={theme}>
        <Router>
          <DrawerResponsive />
          <Switch>
            {/* User Routes */}
            <AuthRoute
              exact
              path="/login"
              component={login}
              authenticated={authenticated}
            />
            <AuthRoute
              exact
              path="/signup"
              component={signup}
              authenticated={authenticated}
            />
            <Route exacth path="/signout" component={signout} />
            {/* Home Page */}
            <Route exact path="/" component={home} />

            {/* Note Routes */}
            <Route exact path="/notes" component={Notes} />
            <AuthRoute exact path="/createNote" component={CreateNote} />
            <AuthRoute exact path="/notes/edit/:noteID" component={EditNote} />

            {/* Todo Routes */}
            <Route exact path="/todos" component={Todos} />
            <AuthRoute exact path="/createTodo" component={CreateTodo} />

            {/* Calendar Routes */}
            <Route exact path="/calendars" component={GetCalendar} />
            <Route exact path="/calendars/list" component={CalendarList} />
            <AuthRoute
              exact
              path="/calendars/edit/:id"
              component={EditCalendar}
            />
            <AuthRoute
              exact
              path="/createCalendar"
              component={CreateCalendar}
            />

            {/* Open House Routes */}
            <Route exact path="/open_houses" component={Houses} />
            <AuthRoute
              exact
              path="/open_houses/:id"
              component={OpenHouseView}
            />
            <AuthRoute exact path="/createHouse" component={CreateHouse} />
            <AuthRoute
              exact
              path="/open_houses/edit/:id"
              component={EditOpenHouse}
            />
            {/* Listing Routes */}
            <Route exact path="/listings" component={GetListings} />
            <AuthRoute exact path="/listings/:id" component={ListingView} />
            <AuthRoute exact path="/createListing" component={CreateListing} />
            <AuthRoute
              exact
              path="/listings/edit/:id"
              component={EditListing}
            />

            {/* Atteendee Routes */}
            <Route exact path="/attendees/:houseID" component={GetAttendees} />
            <AuthRoute
              exact
              path="/createAttendee/:houseID"
              component={CreateAttendee}
            />
            <AuthRoute
              exact
              path="/attendees/edit/:attendeeID"
              component={EditAttendee}
            />
          </Switch>
        </Router>
      </ThemeProvider>
    </div>
  );
}

export default App;
