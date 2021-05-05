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
  import PeopleOutlineOutlinedIcon from '@material-ui/icons/PeopleOutlineOutlined';
  import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
  import React from "react";

  export default function OpenHouseCard({ house, handleDelete }) {
    document.title = "House Cards";
    return (
      <div>
        <Card elevation={1} >
          <CardHeader title={house.property_Name} subheader={"Date: "+house.date}/>
          <CardMedia style = {{ height: 0, paddingTop: '56%'}} image={house.imageUrl}/>
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              Address: <br />{house.address}
            </Typography>
          </CardContent>
          <CardActions style={{paddingLeft:"28%"}}>
          <IconButton title="View Open House Details" aria-label="View Open House Details" href={"/open_houses/"+house.houseID}>
            <VisibilityOutlinedIcon/>
          </IconButton>  
          <IconButton title="View Attendees" aria-label="View Attendees" href={"/attendees/"+house.houseID}>
            <PeopleOutlineOutlinedIcon/>
          </IconButton>
          <IconButton color="secondary" title="Delete" aria-label="Delete" onClick={() => {if(window.confirm('Are you sure you wish to delete this item?')) handleDelete(house.houseID) }}>
            <DeleteOutlinedIcon />
          </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
  