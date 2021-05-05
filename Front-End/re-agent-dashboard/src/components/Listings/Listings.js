import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ListingCard from "./ListingCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Listing() {
  const [listings,setListings] = useState([])

  useEffect(() => {
    document.title = "Listing Cards";
    axios
      .get("/listings")
      .then((response) => {
        setListings(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleDelete = async (id) => {
    await axios.delete("/listings/" + id)
    .then(res =>{
      console.log(res);
      const newListings = listings.filter(listing => listing.listingID !== id)
      setListings(newListings);
    })
  }

  


  return (
    <Container>
     <Typography variant="h4">Listings</Typography>
      <Grid container spacing={3} style={{paddingTop:"20px"}}>
        {listings.map(listing =>(
          <Grid item key={listing.listingID} xs={12} md={6} lg={4}>
            <ListingCard listing={listing} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
      <Fab color="secondary" title="Add Listing" href="/createListing" style={{marginTop:"20px"}}>
        <AddIcon/>
      </Fab>
    </Container>
  )
}


