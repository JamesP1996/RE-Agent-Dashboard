import React from "react";
import Calendars from "./Calendars";
import axios from 'axios';
import '../../App.css';

class GetCalendar extends React.Component
{
    // Make an Empty Array State for Calendar
    state = {
        calendars: []
    }

    // Grab the Calendar Data from Backend when this component is mounted
    componentDidMount(){
        axios.get('/calendars')
            .then((response)=>{
                this.setState({calendars: response.data})
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render(){
        return (
            <div id="calendarRead">
                <div id="calendarData">
                    <h1>Calendar</h1>
                    <ul id="ListParent">
                        <Calendars myCalendars={this.state.calendars}></Calendars>
                    </ul>
                </div>
            </div>
        );
    }

}
export default GetCalendar;