import React from "react";
import Attendees from "./Attendees";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class GetAttendees extends React.Component {
  // Make an Empty Array State for Attendees
  state = {
    attendees: [],
  };
  // Grab the Note Data from Backend when this component is mounted
  componentDidMount() {
    document.title = "Attendees";
    axios
      .get(`/attendees/${this.props.match.params.houseID}`)
      .then((response) => {
        this.setState({ attendees: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  // Render a Create Attendees Button and the actual attendees relevant
  // to this house.
  render() {
    return (
      <div id="noteread">
        <div id="noteData">
          <h1>Attendees</h1>
           <Button
            component={Link}
            to={`/createAttendee/${this.props.match.params.houseID}`}
            variant="contained"
            color="primary"
          >
              Create Attendees
          </Button>
          <ul id="ListParent">
            <Attendees myAttendees={this.state.attendees}></Attendees>
          </ul>
        </div>
      </div>
    );
  }
}
export default GetAttendees;
