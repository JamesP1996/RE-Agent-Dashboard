import "./App.css";

// Module Imports
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";
import axios from "axios";

// Utilities
// Route for Grabbing User ID and Ensuring User has a Token
import AuthRoute from "./util/AuthRoute"; 

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
// Open_House Routes
import GetHouses from "./components/Open_House/GetHouses";
// Listing Routes
import GetListings from "./components/Listings/GetListings";

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

function App() {
  return (
    <div className="App">
      <Router>
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
          <Route exact path="/open_houses" component={GetHouses} />
          <Route exact path="/listings" component={GetListings} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
