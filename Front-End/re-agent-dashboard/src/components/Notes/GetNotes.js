import React from "react";
import Notes from "./Notes";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class GetNotes extends React.Component {
  // Make an Empty Array State for Notes
  state = {
    notes: [],
  };

  // Grab the Note Data from Backend when this component is mounted
  componentDidMount() {
    axios
      .get("/notes")
      .then((response) => {
        this.setState({ notes: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="noteread">
        <div id="noteData">
          <h1>Notes</h1>
          <Button
            component={Link}
            to="/createNote"
            variant="contained"
            color="primary"
          >
              Create Note
          </Button>
          <ul id="ListParent">
            <Notes myNotes={this.state.notes}></Notes>
          </ul>
        </div>
      </div>
    );
  }
}
export default GetNotes;
