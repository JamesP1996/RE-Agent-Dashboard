import React, { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";

import RaisedButton from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
function ListingView() {
  const [listing, setListing] = useState({});
  const [open, setOpen] = React.useState(false);
  const [File, setFile] = React.useState({});

  // Handles the opening and closing of the form dialog
  const handleClickOpen = () => {
    setOpen(true);
  };
  // Handle the file selected (Pre-Upload)
  const fileSelectedHandler = (event) => {
    let file_size = event.target.files[0].size;
    // Give warning if user tries to upload file larger then 5Mb
    if (file_size > 5242880) {
      alert("File Size to Large (Limit 5MB)");
      setFile("");
    } else {
      setFile(event.target.files[0]);
    }
  };
  // Handle File Uploads.
  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", File);
    axios
      .put(
        `/listings/image/${props.id}`,
        fd
      )
      .then((res) => {
        console.log(res);
        alert("File Uploaded Successfully");
        setOpen(false);
        window.location.reload();
      })
      .catch((res) => {
        alert(res + "\n File needs to be in JPEG/PNG Format");
        window.location.reload();
      });
  };

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
      <div class="row">
        <div class="columnView">
          <p>Date Listed: {dateParsed(listing.createdAt)}</p>
          <img src={listing.imageUrl} class="viewImage" alt="listing-img"></img>
          <span>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/listings/edit/${props.id}`}
          >
            Edit Listing
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Upload a Image
          </Button>

          </span>
          <h2>
            Owners:
            <br /> {listing.owners}
          </h2>
          <h2>
            Address: <br />
            {listing.address}
          </h2>
          <h2>
            Price: <br />${listing.price}
          </h2>
          <h2>
            Sqft:
            <br />
            {listing.sqft}
          </h2>
          <h2>
            Sqft_Lot:
            <br />
            {listing.sqft_Lot}
          </h2>
        </div>
        <div class="columnView">
          <h3>
            Style: <br />
            {listing.style}
          </h3>
          <h3>Bedrooms: {listing.bedrooms}</h3>
          <h3>Stories: {listing.stories}</h3>
          <h3>Bathrooms: {listing.bathrooms}</h3>
          <h3>Cooling: {listing.cooling}</h3>
          <h3>Heating: {listing.heating}</h3>
          <h3>Parking: {listing.parking}</h3>
          <h3>Basement: {listing.basement}</h3>
          <h3>
            Other Features:
            <br />
            {listing.other_features}
          </h3>
          <iframe
            width="600"
            height="450"
            style={{ borderTop: "30px" }}
            loading="lazy"
            allowfullscreen
            title="Listing on Map"
            src={
              `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9XbXYjAlgalSifIKaEzqaPNunDjrVfYw
              &q=${listing.address}`
            }
          ></iframe>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="form-dialog-title"
          >
            <DialogTitle id="form-dialog-title">Upload a Image</DialogTitle>
            <DialogContent>
              <DialogContentText>
                <p>Upload a 5Mb or less image(png/jpeg)</p>
              </DialogContentText>
              <RaisedButton
                containerElement="label"
                label="My Label"
                for="image_uploads"
              >
                <input
                  type="file"
                  title=" "
                  onChange={fileSelectedHandler}
                  accept="image/png, image/jpeg"
                  id="image_uploads"
                  name="image_uploads"
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

      <Button
        component={Link}
        to={`/listings/`}
        variant="contained"
        color="secondary"
        style={{ marginTop: "20px" }}
      >
        Go Back
      </Button>
    </div>
  );
}
export default ListingView;
