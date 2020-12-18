import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";


import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';
import notes from './pages/notes';
import todos from './pages/todos';
import calendar from './pages/calendar';
import open_house from './pages/open_house';
import listing from './pages/listing';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
          <Route exact path="/notes" component={notes}/>
          <Route exact path="/todos" component={todos}/>
          <Route exact path="/calendars" component={calendar}/>
          <Route exact path="/open_houses" component={open_house}/>
          <Route exact path="/listings" component={listing}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
