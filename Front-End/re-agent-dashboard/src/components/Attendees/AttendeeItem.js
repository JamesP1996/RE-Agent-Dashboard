import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class AttendeeItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteAttendee = this.DeleteAttendee.bind(this);
    this.MarkAsInterested = this.MarkAsInterested.bind(this);
    this.MarkAsUninterested = this.MarkAsUninterested.bind(this);
    this.MarkAsContacted = this.MarkAsContacted.bind(this);
  }

  // Delete Note From Server Based off NoteID
  DeleteAttendee(e) {
    axios
      .delete("/attendees/" + this.props.attendee.attendeeID)
      .then(window.location.reload())
      .catch(console.log("Attendee could not be deleted"));
  }

  MarkAsInterested(e){
    console.log(this.props.attendee.attendeeID+ " Called by Interest Function");
    axios
    .put("/attendees/interest/" + this.props.attendee.attendeeID)
    .then(window.location.reload())
    .catch(console.log("Attendee Marked as Interested"))
  }
  MarkAsUninterested(e){
    console.log(this.props.attendee.attendeeID+ " Called by Uninterest Function");
    axios
    .put("/attendees/uninterest/" + this.props.attendee.attendeeID)
    .then(window.location.reload())
    .catch(console.log("Attendee Marked as Uninterested"))
  }

  MarkAsContacted(e){
    console.log(this.props.attendee.attendeeID+ " Called by Contacted Function");
    axios
    .put("/attendees/contacted/" + this.props.attendee.attendeeID)
    .then(window.location.reload())
    .catch(console.log("Attendee Marked as Contacted"))
  }

  render() {
    document.title = "Attendee";
    function CheckMark(input){
      if(input){
        return '✅';
      }
      else return '❌'
    }

    function ContactedButton(input,button){
      if(input === false){
        return(
      <Button variant="outlined" color="primary" onClick={button} size="small" style={{margin:"5px"}}>
        Mark as Contacted
      </Button>
      )
      }else{
        return <p></p>;
      }
    }

    function InterestedButton(input,InterestFunc,UninterestedFunc){
      if(input === false){
        return(
       <Button variant="outlined" color="primary" onClick={InterestFunc} size="small" style={{margin:"5px"}}>
        Mark as Interested
      </Button>
        )
      }
      else{
        return(
        <Button variant="outlined" color="primary" onClick={UninterestedFunc} size="small" style={{margin:"5px"}}>
        Mark as Uninterested
      </Button>
        )
      }
    }

    return (
      <li>
        <b>{this.props.attendee.full_Name}</b>
        <br />
        <b>Phone: {this.props.attendee.number}</b>
        <br />
        <b>Email: {this.props.attendee.email}</b>
        <br />
        <b>
          Contacted : {CheckMark(this.props.attendee.contacted)}  Interested : {CheckMark(this.props.attendee.interested)}
        </b>
        < br/>
        {ContactedButton(this.props.attendee.contacted,this.MarkAsContacted)}
        {InterestedButton(this.props.attendee.interested,this.MarkAsInterested,this.MarkAsUninterested)}
        < br/>
        <Button
        size="small"
            variant="contained"
            color="primary"
            component={Link}
            to={"/attendees/edit/" +this.props.attendee.attendeeID}
          >
            Edit
        </Button>
        <Button variant="contained" color="secondary" onClick={this.DeleteAttendee} size="small" style={{margin:"5px"}}>
          Delete
        </Button>
      </li>
    );
  }


}

export default AttendeeItem;