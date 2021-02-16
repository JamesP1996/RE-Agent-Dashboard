import React, { Component } from "react";
import CalendarItem from "./CalendarItem";

class Calendar extends Component {
  render() {
    return this.props.myCalendars.map((calendar) => {
      return <CalendarItem key={calendar.calendarID} calendar={calendar}></CalendarItem>;
    });
  }

}

export default Calendar;
