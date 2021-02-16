import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class HouseItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteHouse = this.DeleteHouse.bind(this);
  }

  // Delete House From Server Based off CalenderID
  DeleteHouse(e) {
    axios
      .delete("/open_houses/" + this.props.house.houseID)
      .then(window.location.reload())
      .catch(console.log("House could not be deleted"));
  }

  render() {
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.house.address}</b>
                <br/>
                <p>{this.props.house.sqft} SQFT -- Posted By <b>{this.props.house.userHandle}</b></p>
                <p><b>Owners: {this.props.house.sellers_Names}</b></p>
                <br/>
                <img src={this.props.house.imageUrl} className="card-image" alt="house-img"></img>
                <br/>
        <Button variant="contained" color="secondary" onClick={this.DeleteHouse}>
          Delete
        </Button>
        <Link to={"/edit/" +this.props.house.houseID} variant="contained" color="secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default HouseItem;