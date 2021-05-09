import React,{Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class CalendarItem extends Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteCalendar = this.DeleteCalendar.bind(this);
  }

  // Delete Note From Server Based off NoteID
  DeleteCalendar(e) {
    axios
      .delete(`/calendars/${this.props.calendar.id}`)
      .then(window.location.reload())
      .catch(console.log("Calendar could not be deleted"));
  }

  render() {
    document.title = "Calendar Entry";

    // Parse a Date to UTCString Format.
    function parseDate(date){
      return new Date(date).toUTCString();
    }

    // Parse the allDay Datafield and return a checkmark if all day 
    //or a parsed date if not.
    function parseAllDay(allDay,endTime){
      if(allDay === false){
        return <b>End Time: {parseDate(endTime)}</b>;
      }
      else return <b>All Day:'✅'</b>;
    }
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.calendar.title}</b>
        <br/>
        <b><i>{this.props.calendar.description}</i></b>
        <br/>
        <b>Start Time: {parseDate(this.props.calendar.start)}</b>
        <br/>
          {parseAllDay(this.props.calendar.allDay,this.props.calendar.end)}
        <br/>
        <br />
        <Button variant="contained" color="secondary" onClick={this.DeleteCalendar}>
          Delete
        </Button>
        <Button
            component={Link}
            to={"/calendars/edit/" +this.props.calendar.id} 
            variant="contained"
            color="primary"
          >
               Edit
          </Button>
      </li>
    );
  }


}

export default CalendarItem;