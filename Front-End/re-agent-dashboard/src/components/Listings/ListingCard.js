import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    IconButton,
    Typography,
  } from "@material-ui/core";
  import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
  import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
  import React from "react";

  export default function OpenHouseCard({ listing, handleDelete }) {
    document.title = "Listing Cards";
    function parseDate(date){
        return new Date(date).toUTCString();
      }
    return (
      <div>
        <Card elevation={1} >
          <CardHeader title={listing.address} subheader={"Owners: "+listing.owners}/>
          <CardMedia style = {{ height: 0, paddingTop: '56%'}} image={listing.imageUrl}/>
          <CardContent>
            <Typography variant="body1" color="textSecondary">
              Created On: <br />{parseDate(listing.createdAt)}
              <br />
              Price: <br />${listing.price}
            </Typography>
          </CardContent>
          <CardActions style={{paddingLeft:"35%"}}>
          <IconButton title="View Listing Details" aria-label="View Listing Details" href={"/listings/"+listing.listingID}>
            <VisibilityOutlinedIcon/>
          </IconButton>  
          <IconButton color="secondary" title="Delete" aria-label="Delete" onClick={() => {if(window.confirm('Are you sure you wish to delete this item?')) handleDelete(listing.listingID) }}>
            <DeleteOutlinedIcon />
          </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
  