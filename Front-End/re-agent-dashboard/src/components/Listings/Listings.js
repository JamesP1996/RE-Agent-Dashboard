import React, { Component } from "react";
import ListingItem from "./ListingItem";

class Listings extends Component {
  render() {
    return this.props.myListings.map((listing) => {
      return <ListingItem key={listing.listingID} listing={listing}></ListingItem>;
    });
  }

}

export default Listings;
