import React, { Component } from "react";
import AttendeeItem from "./AttendeeItem";

// Map the Attendees to Attendee Items
class Attendees extends Component {
  render() {
    return this.props.myAttendees.map((attendee) => {
      return < AttendeeItem key={attendee.attendeeID} attendee={attendee}></AttendeeItem>;
    });
  }

}

export default Attendees;
