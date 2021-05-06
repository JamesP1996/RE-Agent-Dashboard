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
import { useParams } from "react-router";
import { Link } from "react-router-dom";
function OpenHouseView() {
  const [house, setHouse] = useState({});
  const [open, setOpen] = React.useState(false);
  const [File, setFile] = React.useState({});

  const handleClickOpen = () => {
    setOpen(true);
  };

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

  const fileUploadHandler = () => {
    const fd = new FormData();
    fd.append("image", File);
    axios
      .put(
        `/open_houses/image/${props.id}`,
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
    const result = await axios(`/open_houses/${props.id}`);

    setHouse(result.data);
  }

  // const dateParsed = () => {
  //   const date = new Date(house.createdAt).toLocaleString();
  //   return date;
  // };

  useEffect(() => {
    document.title = "Open House View";
    getData();
    //(Stop Warning Coming up, do not have a tracked var type within [])
    // eslint-disable-next-line
  }, []);
  //   houseID: req.body.houseID,
  //   property_Name: req.body.property_Name,
  //   sqft: req.body.sqft,
  //   sqft_Lot: req.body.sqft_Lot,
  //   address: req.body.address,
  //   date: req.body.date,
  //   sellers_Names: req.body.sellers_Names,
  //   price: req.body.price,
  //   attendees: req.body.attendees,

  //   userHandle: req.user.handle,
  //   createdAt: new Date().toISOString(),
  return (
    <div>

      <div class="row">
        <div class="columnView">
          
        <h3>Date of Open_House: < br/>{house.date}</h3>
          <img
            src={house.imageUrl}
            class="viewImage"
            alt="house-img"
          ></img>
           <span>
          <Button
            variant="contained"
            color="primary"
            component={Link}
            to={`/open_houses/edit/${props.id}`}
          >
            Edit Open House
          </Button>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleClickOpen}
          >
            Upload a Image
          </Button>

          </span>
        </div>
        <div class="columnView">
          <h1>{house.property_Name}</h1>
          <h2>Address: <br/>{house.address}</h2>
          <h2>Price: <br/>${house.price}</h2>
          <h2>Sellers:<br/>{house.sellers_Names}</h2>

          <p>Lot Size Sqft:{house.sqft_Lot}</p>
          <p>Sqft:{house.sqft}</p>
          <Button
            component={Link}
            to={`/attendees/${props.id}`}
            variant="contained"
            color="primary"
          >
            See Attendees
          </Button>
          <iframe
            width="600"
            height="450"
            style={{ borderTop: "30px" }}
            loading="lazy"
            allowfullscreen
            title="Open House on Map"
            src={
              `https://www.google.com/maps/embed/v1/place?key=AIzaSyA9XbXYjAlgalSifIKaEzqaPNunDjrVfYw
              &q=${house.address}`
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
            to={`/open_houses/`}
            variant="contained"
            color="secondary"
            style={{marginTop:"20px"}}
          >
            
            Go Back
          </Button>
    </div>
  );
}
export default OpenHouseView;
