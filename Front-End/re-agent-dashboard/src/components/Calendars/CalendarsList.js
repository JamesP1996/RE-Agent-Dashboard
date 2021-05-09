import { Button, Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom";
import CalendarItem from "./CalendarItem";
export default function CalendarsList() {
  const [calendars,setCalendars] = useState([])

  useEffect(() => {
    document.title = "Calendar List";
    axios
      .get("/calendars")
      .then((response) => {
        setCalendars(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleDelete = async (id) => {
    await axios.delete("/calendars/" + id)
    .then(res =>{
      console.log(res);
      const newCalendars = calendars.filter(calendar => calendar.id !== id)
      setCalendars(newCalendars);
    })
  }

  // List the Listings in a Card Grid with Options included
  return (
    <Container>
     <Typography variant="h4">Calendar List of Events</Typography>
      <Grid container spacing={3} style={{paddingTop:"20px"}} alignItems={"center"} alignContent={"center"}>
        {calendars.map(calendar =>(
          <Grid item key={calendar.id} xs={12} md={12} lg={12}>
            <CalendarItem calendar={calendar} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
      
      <Button
        component={Link}
        to={`/calendars/`}
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </Container>
  )
}


