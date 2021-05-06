import React from "react";
import axios from "axios";
import "../../App.css";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from "@fullcalendar/list";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";



class GetCalendar extends React.Component {

  constructor() {
    super();
  // Make an Empty Array State for Calendar
  this.state = {
    events: [],
    width: 0,
    mobile: false
  };

  window.addEventListener("resize", this.update)
}

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
    document.title = "Calendar";
    axios
      .get("/calendars")
      .then((response) => {
        this.setState({ events: response.data, width:window.innerWidth });
        console.log(this.state.events);
      })
      .catch((error) => {
        console.log(error);
      });

    console.log(this.state.mobile);
  }

  mobileView = () => {
    if(this.state.width < 800){
      this.setState({mobile : true});
    }
    else{
      this.setState({mobile : false});
    }
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
        <div id="CalendarList">
          <span>
            <Button
            component={Link}
            to={`/createCalendar`}
            variant="contained"
            color="secondary"
            style={{margin:"20px 20px 20px 20px"}}
          >
              Create a New Event
          </Button>
          <Button
            component={Link}
            to={`/calendars/list/`}
            variant="contained"
            color="secondary"
          >
              See all Events
          </Button>
          
          </span>
       
        </div>
        <p>You may click on any calendar entry to see it's details.</p>
        <p>To delete calendar events you must click on "See all Events".</p>
        <div id="Calendar">
          <FullCalendar
            plugins={[dayGridPlugin,timeGridPlugin,listPlugin]}
            initialView = "listWeek"
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
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
          }}
          eventClassNames={"eventClass"}
          />
        </div>
        
      </main>
    );
  }
}
export default GetCalendar;
