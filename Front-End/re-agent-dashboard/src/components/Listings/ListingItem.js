import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class ListingItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteListing = this.DeleteListing.bind(this);
  }

  // Delete Listing From Server Based off CalenderID
  DeleteListing(e) {
    axios
      .delete("/listings/" + this.props.listing.listingID)
      .then(window.location.reload())
      .catch(console.log("Listing could not be deleted"));
  }

  render() {
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.listing.address}</b>
                <br/>
                <p>{this.props.listing.sqft} SQFT -- Posted By <b>{this.props.listing.userHandle}</b></p>
                <p><b>Owners: {this.props.listing.owners}</b></p>
                <br/>
                <img src={this.props.listing.imageUrl} className="card-image" alt="house-img"></img>
                <br/>
        <Button variant="danger" onClick={this.DeleteListing}>
          Delete
        </Button>
        <Link to={"/edit/" +this.props.listing.listingID} variant="Secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default ListingItem;