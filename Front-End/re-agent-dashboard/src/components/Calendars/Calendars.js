import React, { Component } from "react";
import CalendarItem from "./CalendarItem";

class Calendars extends Component {
  render() {
    return this.props.myCalendars.map((calendar) => {
      return <CalendarItem key={calendar.id} calendar={calendar}></CalendarItem>;
    });
  }

}

export default Calendars;
