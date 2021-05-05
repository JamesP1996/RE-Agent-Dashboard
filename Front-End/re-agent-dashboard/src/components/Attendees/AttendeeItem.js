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
    document.title = "Attendee";
    function CheckMark(input){
      if(input){
        return '✅';
      }
      else return '❌'
    }
    return (
      <li>
        <b>{this.props.attendee.full_Name}</b>
        <br />
        <b>Phone: {this.props.attendee.number}</b>
        <br />
        <b>Email: {this.props.attendee.email}</b>
        <br />
        <b>
          Contacted : {CheckMark(this.props.attendee.contacted)}  Interested : {CheckMark(this.props.attendee.interested)}
        </b>
        < br/>
        <Button variant="contained" color="secondary" onClick={this.DeleteAttendee} size="small" style={{margin:"5px"}}>
          Delete
        </Button>
        <Button
        size="small"
            variant="contained"
            color="primary"
            component={Link}
            to={"/attendees/edit/" +this.props.attendee.attendeeID}
          >
            Edit
          </Button>
      </li>
    );
  }


}

export default AttendeeItem;