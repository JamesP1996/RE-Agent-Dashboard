import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


import signup from './pages/signup';
import login from './pages/login';
import home from './pages/home';
import notes from './pages/notes';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={home}/>
          <Route exact path="/login" component={login}/>
          <Route exact path="/signup" component={signup}/>
          <Route exact path="/notes" component={notes}/>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
