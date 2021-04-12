import "./App.css";
// Module Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Utilities
// Route for Grabbing User ID and Ensuring User has a Token
import AuthRoute from "./util/AuthRoute"; 
import Navbar from "./components/Navbar/navbar";

// User Routes
import signup from "./pages/signup";
import login from "./pages/login";

// Home Route
import home from "./pages/home";

// Component Imports
// Notes Routes
import GetNotes from "./components/Notes/GetNotes";
import CreateNote from "./components/Notes/CreateNote";
// Todo Routes
import GetTodos from "./components/Todos/GetTodos";
import CreateTodo from "./components/Todos/CreateTodo";
// Calendar Routes
import GetCalendar from "./components/Calendars/GetCalendar";
import CreateCalendar from "./components/Calendars/CreateCalendar";
// Open_House Routes
import GetHouses from "./components/Open_House/GetHouses";
import CreateHouse from "./components/Open_House/CreateHouse";
import OpenHouseView from "./components/Open_House/OpenHouseView";
// Listing Routes
import GetListings from "./components/Listings/GetListings";
import CreateListing from "./components/Listings/CreateListing";
import ListingView from "./components/Listings/ListingView";
// Attendees Routes
import GetAttendees from "./components/Attendees/GetAttendees";
import CreateAttendee from "./components/Attendees/CreateAttendee";

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
  try{
    localStorage.clear();
    authenticated=false;
    axios.defaults.headers.common["Authorization"] = null;
  }catch(err){console.log(err);}
  window.location.replace("/login");
  return null;
}


function App() {
  return (
    <div className="App">
       <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=0, maximum-scale=1, minimum-scale=1"
        />
      <Router>
        <Navbar />
        <Switch>
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
          <Route exact path="/" component={home} />
          <Route exact path="/notes" component={GetNotes} />
          <AuthRoute exact path ="/createNote" component={CreateNote}/>
          <Route exact path="/todos" component={GetTodos} />
          <AuthRoute exact path ="/createTodo" component={CreateTodo}/>
          <Route exact path="/calendars" component={GetCalendar} />
          <AuthRoute exact path ="/createCalendar" component={CreateCalendar}/>
          <Route exact path="/open_houses" component={GetHouses} />
          <AuthRoute exact path="/open_houses/:id" component={OpenHouseView}/>
          <AuthRoute exact path="/createHouse" component={CreateHouse}/>
          <Route exact path="/listings" component={GetListings} />
          <AuthRoute exact path="/listings/:id" component={ListingView} />
          <AuthRoute exact path="/createListing" component={CreateListing}/>
          <Route exact path="/attendees/:houseID" component={GetAttendees}/>
          <AuthRoute exact path="/createAttendee/:houseID" component={CreateListing}/>
          <Route exacth path="/signout" component={signout}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
