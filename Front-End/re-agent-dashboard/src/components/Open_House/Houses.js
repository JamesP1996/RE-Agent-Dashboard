import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import OpenHouseCard from "./OpenHouseCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Houses() {
  const [houses,setHouses] = useState([])

  useEffect(() => {
    document.title = "Open House Cards";
    axios
      .get("/open_houses")
      .then((response) => {
        setHouses(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleDelete = async (id) => {
    await axios.delete("/open_houses/" + id)
    .then(res =>{
      console.log(res);
      const newHouses = houses.filter(house => house.houseID !== id)
      setHouses(newHouses);
    })
  }

  


  return (
    <Container>
      <Grid container spacing={3}>
        {houses.map(house =>(
          <Grid item key={house.houseID} xs={12} md={6} lg={4}>
            <OpenHouseCard house={house} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
      <Fab color="secondary" title="Add House" href="/createTodo" style={{marginTop:"20px"}}>
        <AddIcon/>
      </Fab>
    </Container>
  )
}


