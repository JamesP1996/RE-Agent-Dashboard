import React from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import  Button from "@material-ui/core/Button";

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
      <li>
        <b>{this.props.todo.Title}</b>
        <br />
        <p>
          {this.props.todo.Description} by -- {this.props.todo.userHandle}
        </p>
        <Button variant="danger" onClick={this.DeleteTodo}>
          Delete
        </Button>
        <Link to={"/edit/" +this.props.todo.todoID} variant="Secondary">
            Edit
        </Link>
      </li>
    );
  }


}

export default TodoItem;