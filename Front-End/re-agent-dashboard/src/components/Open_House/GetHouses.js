import React from "react";
import Houses from "./Houses";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class GetHouses extends React.Component {
  // Make an Empty Array State for Notes
  state = {
    houses: [],
  };

  // Grab the Note Data from Backend when this component is mounted
  componentDidMount() {
    axios
      .get("/open_houses")
      .then((response) => {
        this.setState({ houses: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    document.title = "Open House List";
    return (
      <div id="listingread">
        <div id="listingData">
          <h1>Houses</h1>
          <Button
            component={Link}
            to="/createHouse"
            variant="contained"
            color="primary"
          >
            Create House
          </Button>
          <ul id="ListParent">
            <Houses myHouses={this.state.houses}></Houses>
          </ul>
        </div>
      </div>
    );
  }
}
export default GetHouses;
