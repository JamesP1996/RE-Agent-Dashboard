import React from "react";
import Calendars from "./Calendars";
import axios from "axios";
import "../../App.css";

class CalendarList extends React.Component {
  // Make an Empty Array State for Calendars
  state = {
    calendars: [],
  };

  // Grab the Calendar Data from the API
  componentDidMount() {
    axios
      .get("/calendars")
      .then((response) => {
        this.setState({ calendars: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    document.title = "Calendar Event List";
    return (
      <div id="noteread">
        <div id="noteData">
          <h1>Calendar Event List</h1>
          <ul id="ListParent">
            <Calendars myCalendars={this.state.calendars}></Calendars>
          </ul>
        </div>
      </div>
    );
  }
}
export default CalendarList;
