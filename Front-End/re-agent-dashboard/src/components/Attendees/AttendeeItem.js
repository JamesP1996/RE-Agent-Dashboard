import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class AttendeeItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteAttendee = this.DeleteAttendee.bind(this);
  }

  // Delete Note From Server Based off NoteID
  DeleteAttendee(e) {
    axios
      .delete("/attendees/" + this.props.attendee.attendeeID)
      .then(window.location.reload())
      .catch(console.log("Note could not be deleted"));
  }

  render() {
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.attendee.full_Name}</b>
        <b>Phone: {this.props.attendee.number}</b>
        <b>Email: {this.props.attendee.email}</b>
        <br />
        <p>
          {this.props.attendee.contacted} by -- {this.props.attendee.interested}
        </p>
        <Button variant="contained" color="secondary" onClick={this.DeleteAttendee}>
          Delete
        </Button>
        <Link to={"/edit/" +this.props.attendee.attendeeID} variant="contained" color="secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default AttendeeItem;