import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

class NoteItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteNote = this.DeleteNote.bind(this);
  }

  // Delete Note From Server Based off NoteID
  DeleteNote(e) {
    axios
      .delete("/notes/" + this.props.note.noteID)
      .then(window.location.reload())
      .catch(console.log("Note could not be deleted"));
  }

  render() {
    return (
      <li style={{border: "3px solid #000000"}}>
        <b>{this.props.note.title}</b>
        <br />
        <p>
          {this.props.note.description} by -- {this.props.note.userHandle}
        </p>
        <Button variant="contained" color="secondary" onClick={this.DeleteNote}>
          Delete
        </Button>
        <Link to={"/notes/edit/" +this.props.note.noteID} variant="contained" color="secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default NoteItem;