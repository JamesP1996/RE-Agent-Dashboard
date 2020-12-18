import React, { Component } from "react";
import axios from "axios";

export default class open_house extends Component {
  state = {
    open_houses: [],
  };

  componentDidMount() {
    axios.get(`/open_houses`).then((res) => {
      const open_houses = res.data;
      this.setState({ open_houses });
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Open House Entries</h1>
        <ul className="list">
          {this.state.open_houses.map((house) => (
            <li className="entries" key={house.houseID} >
                <b><p>{house.property_Name}</p></b>
                {console.log(house)}
                <p>{house.address}</p>
                <p>{house.sqft} by sqft -- <b>{house.userHandle}</b></p>
                <p><b>Date: {house.date}</b></p>
                <br/>
                <img src={house.imageUrl} className="card-image"></img>
            </li>
        
          ))}
        </ul>
      </div>
    );
  }
}