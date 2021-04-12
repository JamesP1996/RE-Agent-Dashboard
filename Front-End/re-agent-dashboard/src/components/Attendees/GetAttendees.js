import React from "react";
import Notes from "./Notes";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class GetNotes extends React.Component {
  // Make an Empty Array State for Notes
  state = {
    attendees: [],
  };

  // Grab the Note Data from Backend when this component is mounted
  componentDidMount() {
    axios
      .get(`/attendees/${this.params.houseID}`)
      .then((response) => {
        this.setState({ attendees: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="noteread">
        <div id="noteData">
          <h1>Attendees</h1>
          <Button
            component={Link}
            to={`/createAttendee/${this.params.houseID}`}
            variant="contained"
            color="primary"
          >
              Create Attendee
          </Button>
          <ul id="ListParent">
            <Notes myNotes={this.state.attendees}></Notes>
          </ul>
        </div>
      </div>
    );
  }
}
export default GetNotes;
