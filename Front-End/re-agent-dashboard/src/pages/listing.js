import React, { Component } from "react";
import axios from "axios";

export default class listing extends Component {
  state = {
    listings: [],
  };

  componentDidMount() {
    axios.get(`/listings`).then((res) => {
      const listings = res.data;
      this.setState({ listings });
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Listing Entries</h1>
        <ul className="list">
          {this.state.listings.map((listing) => (
            <li className="entries" key={listing.listingID} >
                <b>{listing.address}</b>
                <br/>
                <p>{listing.sqft} SQFT -- Posted By <b>{listing.userHandle}</b></p>
                <p><b>Owners: {listing.owners}</b></p>
                <br/>
                <img src={listing.imageUrl} className="card-image"></img>
            </li>
        
          ))}
        </ul>
      </div>
    );
  }
}