import React from "react";
import axios from "axios";
import "../../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";
import { Typography } from "@material-ui/core";



class GetCalendar extends React.Component {
  // Make an Empty Array State for Calendar
  state = {
    events: [],
  };

  //   calendarID: doc.id,
  //   Title: doc.data().Title,
  //   Description: doc.data().Description,
  //   StartDateTime: doc.data().StartDateTime,
  //   EndDateTime: doc.data().EndDateTime,
  //   AllDay: doc.data().AllDay,
  //   userHandle: doc.data().userHandle,
  //   createdAt: doc.data().createdAt,

  // Grab the Calendar Data from Backend when this component is mounted
  componentDidMount() {
    axios
      .get("/calendars")
      .then((response) => {
        this.setState({ events: response.data });
        console.log(this.state.events);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const renderEventContent = (eventInfo) => {
        return (
               <>
                 <b><i>{eventInfo.event.title}</i></b>
                 <p>{eventInfo.start}</p>
               </>
        )}
        function createEvent() {
          this.props.history.push("/createCalendar");
        };
    return (
      <main id="container">
        <div id="CalendarList">
          <span>
            <Button
            component={Link}
            to={`/createCalendar`}
            variant="contained"
            color="primary"
            style={{margin:"20px 20px 20px 20px"}}
          >
              Create a New Entry
          </Button>
          <Button
            component={Link}
            to={`/calendars/list/`}
            variant="contained"
            color="primary"
          >
              See all Entries in List Format
          </Button>
          
          </span>
       
        </div>
        <div id="Calendar">
          <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            events={this.state.events}
            eventClick={function (arg) {
              alert(
              `Event Title: ${arg.event.title}
              \nEvent Description: ${arg.event.extendedProps.description}
              \nEvent Start: ${arg.event.start}
              \nEvent End: ${arg.event.end}
              \nIs all Day?: ${arg.event.allDay}`)
            }}
            eventBackgroundColor={"purple"}
            eventContent={renderEventContent}
            showNonCurrentDates={false}
          />
        </div>
        
      </main>
    );
  }
}
export default GetCalendar;
