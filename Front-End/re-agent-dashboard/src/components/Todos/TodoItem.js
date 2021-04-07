import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TodoView from "./TodoView";

class TodoItem extends React.Component {
  // Set up Constructor and Delete Reference
  constructor() {
    super();
    this.DeleteTodo = this.DeleteTodo.bind(this);
  }

  // Delete Todo From Server Based off TodoID
  DeleteTodo(e) {
    axios
      .delete("/todos/" + this.props.todo.todoID)
      .then(window.location.reload())
      .catch(console.log("Todo could not be deleted"));
  }

  render() {
    return (
      <li style={{ border: "3px solid #000000" }}>
        <b>{this.props.todo.Title}</b>
        <br />
        <p>
          {this.props.todo.Description} by -- {this.props.todo.userHandle}
        </p>
        <b>{this.props.todo.Checked}</b>
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.DeleteTodo}
          size="small"
        >
          Delete
        </Button>
        <Link
          to={"/edit/" + this.props.todo.todoID}
          variant="contained"
          color="secondary"
        >
          Edit
        </Link>
        <Link
          to={"/todos/" + this.props.todo.todoID}
          variant="contained"
          color="secondary"
        >
          View Todo
        </Link>
      </li>
    );
  }
}

export default TodoItem;
