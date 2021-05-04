import React from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";

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
          {this.props.todo.Description}
        </p>
        <br></br>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.DeleteTodo}
          size="small"
        >
          Mark as Done
        </Button>
      </li>
    );
  }
}

export default TodoItem;
