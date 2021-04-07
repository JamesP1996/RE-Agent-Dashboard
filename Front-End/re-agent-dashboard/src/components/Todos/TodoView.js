import React from "react";
import "../../App.css";
import axios from "axios";
class TodoView extends React.Component {
  // Make an Empty Array State for Todos
  state = {
    todo: [],
  };

  //Grab Game Data from Server Once Component of Read has Mounted
  componentDidMount() {
    console.log(this.props.match.params.id);
    axios
      .get(`/todos/${this.props.match.params.id}`)
      .then((response) => {
        this.setState({ todo: response.data });
        console.log(this.state.todo);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    const dateParsed = () => {
        const date = new Date(this.state.todo.createdAt).toLocaleString();
        return date;
      };

    return (
      <div>
        <h1>{this.state.todo.Title}</h1>
        <h2>{this.state.todo.Description}</h2>
        <p>{this.state.todo.Checked}</p>
        <p>{this.state.todo.userHandle}</p>
        <p>{dateParsed()}</p>
      </div>
    );
  }
}

export default TodoView;
