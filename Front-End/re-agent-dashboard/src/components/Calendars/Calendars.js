import React, { Component } from "react";
import CalendarItem from "./CalendarItem";

// Map Calendars to Calendar Items
class Calendars extends Component {
  render() {
    return this.props.myCalendars.map((calendar) => {
      return <CalendarItem key={calendar.id} calendar={calendar}></CalendarItem>;
    });
  }

}

export default Calendars;
