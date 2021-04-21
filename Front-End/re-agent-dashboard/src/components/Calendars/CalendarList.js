import React from "react";
import Calendars from "./Calendars";
import axios from "axios";
import "../../App.css";

class CalendarList extends React.Component {
  // Make an Empty Array State for Notes
  state = {
    calendars: [],
  };

  // Grab the Note Data from Backend when this component is mounted
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
    return (
      <div id="noteread">
        <div id="noteData">
          <h1>Calendar List</h1>
          <ul id="ListParent">
            <Calendars myCalendars={this.state.calendars}></Calendars>
          </ul>
        </div>
      </div>
    );
  }
}
export default CalendarList;
