import React from "react";
import axios from "axios";
import "../../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";


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
    return (
      <main id="container">
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
            customButtons={{
                    add_event: {
                        text: 'Add New Calendar Event',
                        click: function() {
                           alert(); 
                        }
                    },
                }}
            headerToolbar={
                {
                    left:'prev,next,today',
                    center:'title',
                    right: 'add_event'
                }
            }
          />
        </div>
      </main>
    );
  }
}
export default GetCalendar;
