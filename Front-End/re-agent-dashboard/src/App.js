import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import jwtDecode from "jwt-decode";

// Utilities
import AuthRoute from "./util/AuthRoute";

// Page Imports
import signup from "./pages/signup";
import login from "./pages/login";
import home from "./pages/home";
import notes from "./pages/notes";
import todos from "./pages/todos";
import calendar from "./pages/calendar";
import open_house from "./pages/open_house";
import listing from "./pages/listing";
import axios from "axios";

// Token Handling
let authenticated;
const token = localStorage.FBIdToken;
if (token) {
  const decodedToken = jwtDecode(token);
  console.log(decodedToken);
  if (decodedToken.exp * 1000 < Date.now()) {
    window.location.href = '/login';
    authenticated = false;
  } else {
    authenticated = true;
    axios.defaults.headers.common['Authorization'] = token 
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
          <Route exact path="/notes" component={notes} />
          <Route exact path="/todos" component={todos} />
          <Route exact path="/calendars" component={calendar} />
          <Route exact path="/open_houses" component={open_house} />
          <Route exact path="/listings" component={listing} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
