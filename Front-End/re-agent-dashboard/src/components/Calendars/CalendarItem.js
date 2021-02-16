import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class CalendarItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteCalendar = this.DeleteCalendar.bind(this);
  }

  // Delete Calendar From Server Based off CalenderID
  DeleteCalendar(e) {
    axios
      .delete("/calendars/" + this.props.calendar.calendarID)
      .then(window.location.reload())
      .catch(console.log("Calendar could not be deleted"));
  }

  render() {
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.calendar.Title}</b>
        <br />
        <p>
          {this.props.calendar.Description} by -- {this.props.calendar.userHandle}
        </p>
        <p><b>Date: {this.props.calendar.Date}</b></p>
        <Button variant="contained" color="secondary" onClick={this.DeleteCalendar}>
          Delete
        </Button>
        <Link to={"/edit/" +this.props.calendar.calendarID} variant="contained" color="secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default CalendarItem;