import { Button, Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AttendeeItem from "./AttendeeItem";
import { useParams } from "react-router-dom";
export default function Attendees() {
  const [attendees, setAttendees] = useState([]);
  const params = useParams();

  useEffect(() => {
    console.log(params.houseID);
    const GetAttendees = () => {
      document.title = "Attendees";
      axios
        .get(`/attendees/${params.houseID}`)
        .then((response) => {
          setAttendees(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    };
    GetAttendees();
  }, [params]);

  // Mark an Attendee as Interested
  const MarkAsInterested = async (id) => {
    await axios
      .put("/attendees/interest/" + id)
      .then((res) => {
        const foundIndex = attendees.findIndex(
          (attendee) => attendee.attendeeID === id
        );
        attendees[foundIndex].interested = true;
      })
      .then(() => {
        window.location.reload();
      })
      .catch(console.log("Attendee Marked as Interested"));
  };

  // Mark an Attendee as Uninterested
  const MarkAsUninterested = async (id) => {
    await axios
      .put("/attendees/uninterest/" + id)
      .then((res) => {
        const foundIndex = attendees.findIndex(
          (attendee) => attendee.attendeeID === id
        );
        attendees[foundIndex].interested = false;
      })
      .then(() => {
        window.location.reload();
      })
      .catch(console.log("Attendee Marked as Uninterested"));
  };

  // Mark an Attendee as Contacted
  const MarkAsContacted = async (id) => {
    await axios
      .put("/attendees/contacted/" + id)
      .then((res) => {
        const foundIndex = attendees.findIndex(
          (attendee) => attendee.attendeeID === id
        );
        attendees[foundIndex].contacted = true;
      })
      .then(() => {
        window.location.reload();
      })
      .catch(console.log("Attendee Marked as Contacted"));
  };

  const handleDelete = async (id) => {
    await axios.delete("/attendees/" + id).then((res) => {
      console.log(res);
      const newAttendees = attendees.filter(
        (attendee) => attendee.attendeeID !== id
      );
      setAttendees(newAttendees);
    });
  };

  // List the Listings in a Card Grid with Options included
  return (
    <Container>
      <Grid
        container
        spacing={3}
        style={{ paddingTop: "20px" }}
        alignItems={"center"}
        alignContent={"center"}
      >
        {attendees.map((attendee) => (
          <Grid item key={attendee.attendeeID} xs={12} md={12} lg={12}>
            <AttendeeItem
              attendee={attendee}
              handleDelete={handleDelete}
              MarkAsContacted={MarkAsContacted}
              MarkAsInterested={MarkAsInterested}
              MarkAsUninterested={MarkAsUninterested}
            />
          </Grid>
        ))}
      </Grid>
      <Button
        component={Link}
        to={`/createAttendee/${params.houseID}`}
        variant="contained"
        color="primary"
        style={{ marginTop: "20px" }}
      >
        Add an Attendee
      </Button>
      <br />
      <Button
        component={Link}
        to={`/open_houses/${params.houseID}`}
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </Container>
  );
}
