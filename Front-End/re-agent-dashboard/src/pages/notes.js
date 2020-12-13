import React, { Component } from "react";
import axios from "axios";

export default class notes extends Component {
  state = {
    notes: [],
  };

  componentDidMount() {
    axios.get(`/notes`).then((res) => {
      const notes = res.data;
      this.setState({ notes });
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Notes</h1>
        <ul>
          {this.state.notes.map((note) => (
            <li key={note.noteID} >
                <b>{note.title}</b>
                <br/>
                <p>{note.description} by -- {note.userHandle}</p>
                </li>
          ))}
        </ul>
      </div>
    );
  }
}