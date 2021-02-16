import React, { Component } from "react";
import NoteItem from "./NoteItem";

class Notes extends Component {
  render() {
    return this.props.myNotes.map((note) => {
      return <NoteItem key={note.noteID} note={note}></NoteItem>;
    });
  }

}

export default Notes;
