import React, { Component } from "react";
import axios from "axios";

export default class todos extends Component {
  state = {
    calendars: [],
  };

  componentDidMount() {
    axios.get(`/calendars`).then((res) => {
      const calendars = res.data;
      this.setState({ calendars });
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Calendar Entries</h1>
        <ul className="list">
          {this.state.calendars.map((calendar) => (
            <li className="entries" key={calendar.calendarID} >
                <b>{calendar.Title}</b>
                <br/>
                <p>{calendar.Description} by -- <b>{calendar.userHandle}</b></p>
                <p><b>Date: {calendar.Date}</b></p>
                <br/>
            </li>
        
          ))}
        </ul>
      </div>
    );
  }
}