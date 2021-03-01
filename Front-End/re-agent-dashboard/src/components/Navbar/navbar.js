import React, { Component, Fragment } from "react";
import { Link } from "react-router-dom";
// MUI stuff
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import HomeIcon from "@material-ui/icons/Home";

class Navbar extends Component {
  render() {
    return (
      <AppBar>
        <Toolbar className="nav-container">
          {localStorage.length > 0 ? (
            <Fragment>
              <HomeIcon fontSize="large" />
              <Box display="flex" flexGrow={1}>
                <Button color="inherit" component={Link} to="/">
                  Home
                </Button>
                <Button color="inherit" component={Link} to="/notes">
                  Notes
                </Button>
                <Button color="inherit" component={Link} to="/todos">
                  Todos
                </Button>
                <Button color="inherit" component={Link} to="/calendars">
                  Calendar
                </Button>
                <Button color="inherit" component={Link} to="/listings">
                  Listings
                </Button>
                <Button color="inherit" component={Link} to="/open_houses">
                  Open Houses
                </Button>
              </Box>
              <Button color="inherit" component={Link} to="/signout">
                Sign-Out
              </Button>
            </Fragment>
          ) : (
            <Fragment>
              <HomeIcon fontSize="large" />
              <Button color="inherit" component={Link} to="/">
                Home
              </Button>
              <Button color="inherit" component={Link} to="/login">
                Login
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Signup
              </Button>
            </Fragment>
          )}
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navbar;
