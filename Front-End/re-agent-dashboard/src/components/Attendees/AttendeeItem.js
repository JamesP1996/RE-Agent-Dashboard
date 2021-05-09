import React from "react";
import Button from "@material-ui/core/Button";
import { Card, CardContent, CardHeader, CardActions } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateIcon from "@material-ui/icons/Create";

export default function AttendeeItem({
  attendee,
  handleDelete,
  MarkAsInterested,
  MarkAsUninterested,
  MarkAsContacted,
}) {
  console.log(attendee);

  document.title = "Attendees";

  // If input is true, return a check mark else a X
  const CheckMark = (input) => {
    if (input) {
      return "✅";
    } else return "❌";
  };

  // Function to remove the contacted button if the attendee in question
  // has Been Contacted.
  const ContactedButton = (input, button) => {
    if (input === false) {
      return (
        <Button
          variant="outlined"
          color="primary"
          onClick={() => {
            MarkAsContacted(attendee.attendeeID);
          }}
          size="small"
          style={{ margin: "5px" }}
        >
          Mark as Contacted
        </Button>
      );
    } else {
      return <p></p>;
    }
  };

  // Function to change the state of the Interested Button
  // Based on what the current value is.
  const InterestedButton = (input) => {
    if (input === false) {
      return (
        <Button
          variant="outlined"
          color="primary"
          id="InterestButton"
          onClick={() => {
            MarkAsInterested(attendee.attendeeID);
          }}
          size="small"
          style={{ margin: "5px" }}
        >
          Mark as Interested
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          color="primary"
          id="UnInterestButton"
          onClick={() => {
            MarkAsUninterested(attendee.attendeeID);
          }}
          size="small"
          style={{ margin: "5px" }}
        >
          Mark as Uninterested
        </Button>
      );
    }
  };

  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          title={attendee.full_Name}
          style={{ borderBottom: "2px solid lightgray" }}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            Phone Number: <br />
            {attendee.number}
            <br />
            Email: <br />
            {attendee.email}
            <br />
          </Typography>
          <Typography variant="body1" color="textSecondary" id="contacted">
            Contacted: {CheckMark(attendee.contacted)}
          </Typography>
          <Typography variant="body1" color="textSecondary" id="interested">
            Interested: {CheckMark(attendee.interested)}
          </Typography>
        </CardContent>
        <CardActions style={{ paddingLeft: "45%" }}>
          <IconButton
            title="Edit Attendee"
            aria-label="Edit Attendee"
            href={"/attendee/edit/" + attendee.attendeeID}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            color="secondary"
            title="Delete"
            aria-label="Delete"
            onClick={() => {
              if (
                window.confirm("Are you sure you wish to delete this attendee?")
              )
                handleDelete(attendee.attendeeID);
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
      {ContactedButton(attendee.contacted, MarkAsContacted)}
      {InterestedButton(
        attendee.interested,
        MarkAsInterested,
        MarkAsUninterested
      )}
    </div>
  );
}
