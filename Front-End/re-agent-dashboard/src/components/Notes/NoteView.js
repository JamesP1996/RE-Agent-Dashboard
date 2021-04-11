import React from "react";
import "../../App.css";
import axios from "axios";
class NoteView extends React.Component {
  // Make an Empty Array State for Todos
  state = {
    note: [],
  };

  //Grab Game Data from Server Once Component of Read has Mounted
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`/notes/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ note: response.data });
        console.log(this.state.note);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const dateParsed = () => {
        const date = new Date(this.state.note.createdAt).toLocaleString();
        return date;
      };

    return (
      <div>
        <h1>{this.state.note.Title}</h1>
        <h2>{this.state.note.Description}</h2>
        <p>{this.state.note.Checked}</p>
        <p>{this.state.note.userHandle}</p>
        <p>{dateParsed()}</p>
      </div>
    );
  }
}

export default NoteView;
