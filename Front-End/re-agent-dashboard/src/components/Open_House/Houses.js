import React, { Component } from "react";
import HouseItem from "./HouseItem";

class Houses extends Component {
  render() {
    return this.props.myHouses.map((house) => {
      return <HouseItem key={house.houseID} house={house}></HouseItem>;
    });
  }

}

export default Houses;
