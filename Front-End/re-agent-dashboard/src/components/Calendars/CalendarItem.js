import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import CreateIcon from "@material-ui/icons/Create";
import React from "react";

export default function CalendarItem({ calendar, handleDelete }) {
  document.title = "Calendar Items";
  function parseDate(date) {
    return new Date(date).toUTCString();
  }
  function CheckMark(input) {
    if (input) {
      return "✅";
    } else return "❌";
  }
  return (
    <div>
      <Card elevation={3}>
        <CardHeader
          title={calendar.title}
          style={{ borderBottom: "2px solid lightgray" }}
        />
        <CardContent>
          <Typography variant="body1" color="textSecondary">
            <b>Start:</b> {parseDate(calendar.start)}
            <br />
            <b>End:</b> {parseDate(calendar.end)}
            <br />
            <b>All Day:</b> {CheckMark(calendar.allDay)}
            <br />
            <br />
            <b style={{textDecoration: "underline"}}>Description:</b> <br />
            {calendar.description}
          </Typography>
        </CardContent>
        <CardActions style={{ paddingLeft: "45%" }}>
          <IconButton
            title="Edit Calendar"
            aria-label="Edit Calendar"
            href={"/calendars/edit/" + calendar.id}
          >
            <CreateIcon />
          </IconButton>
          <IconButton
            color="secondary"
            title="Delete"
            aria-label="Delete"
            onClick={() => {
              if (window.confirm("Are you sure you wish to delete this item?"))
                handleDelete(calendar.id);
            }}
          >
            <DeleteOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
