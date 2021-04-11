import React from "react";
import Todos from "./Todos";
import axios from "axios";
import "../../App.css";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom";

class GetTodos extends React.Component {
  // Make an Empty Array State for Todos
  state = {
    todos: [],
  };

  // Grab the Todo Data from Backend when this component is mounted
  componentDidMount() {
    axios
      .get("/todos")
      .then((response) => {
        this.setState({ todos: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div id="todoRead">
        <div id="todoData">
          <h1>Todos</h1>
          <Button
            component={Link}
            to="/createTodo"
            variant="contained"
            color="primary"
          >
            Create Todo
          </Button>
          <ul id="ListParent">
            <Todos myTodos={this.state.todos}></Todos>
          </ul>
        </div>
      </div>
    );
  }
}
export default GetTodos;
