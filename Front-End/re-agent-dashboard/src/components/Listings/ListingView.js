import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";

import RaisedButton from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router";
function ListingView() {
  const [listing, setListing] = useState({});
  const [open, setOpen] = React.useState(false);
  const [File,setFile] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

  const fileSelectedHandler = (event) =>{
    let file_size = event.target.files[0].size;
    // Give warning if user tries to upload file larger then 5Mb
    if(file_size > 5242880){
      alert("File Size to Large (Limit 5MB)");
      setFile("");
    }
    else{
      setFile(event.target.files[0]);
    }  
  }


  const fileUploadHandler = () => {
      const fd = new FormData();
      fd.append('image',File);
      axios.put(`http://localhost:5000/re-agent-dashboard-22410/europe-west2/api/listings/image/${props.id}`,fd)
      .then(res => {
        console.log(res);
        alert("File Uploaded Successfully");
        setOpen(false);
        window.location.reload();
      })
      .catch(res => {
        alert(res + "\n File needs to be in JPEG/PNG Format");
        window.location.reload();
      })
  }

  const handleClose = () => {
    setOpen(false);
  };

  let props = useParams();
  //Grab Game Data from Server Once Component of Read has Mounted


  async function getData() {
    const result = await axios(`/listings/${props.id}`);

    setListing(result.data);
  }


  const dateParsed = () => {
    const date = new Date(listing.createdAt).toLocaleString();
    return date;
  };
  
  useEffect(() => {
    document.title = "Listing";
    getData();
    //(Stop Warning Coming up, do not have a tracked var type within [])
    // eslint-disable-next-line 
  }, []);

  return (
    <div>
      <div>
        <img
          src={listing.imageUrl}
          className="card-image"
          alt="house-img"
        ></img>
        <h1>{listing.owners}</h1>
        <h2>{listing.address}</h2>
        <h2>{listing.price}</h2>
        <h2>{listing.sqft}</h2>
        <h2>{listing.sqft_Lot}</h2>

        <p>{listing.style}</p>
        <p>{listing.stories}</p>
        <p>{listing.bedrooms}</p>
        <p>{listing.bathrooms}</p>
        <p>{listing.cooling}</p>
        <p>{listing.heating}</p>
        <p>{listing.parking}</p>
        <p>{listing.basement}</p>
        <b>Features : {listing.other_features}</b>
        <p>{dateParsed()}</p>
      </div>
      <div>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Upload a Image
        </Button>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Upload a Image</DialogTitle>
          <DialogContent>
            <DialogContentText><p>Upload a 5Mb or less image(png/jpeg)</p></DialogContentText>
            <RaisedButton
              containerElement="label" 
              label="My Label"
              for="image_uploads"
            >
              <input type="file" 
              title=" "
              onChange={fileSelectedHandler}
              accept="image/png, image/jpeg"
              id="image_uploads" name="image_uploads"
              />
            </RaisedButton>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={fileUploadHandler} color="primary">
              Upload
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );

}
export default ListingView;
