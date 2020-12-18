import React, { Component } from "react";
import axios from "axios";

export default class todos extends Component {
  state = {
    todos: [],
  };

  componentDidMount() {
    axios.get(`/todos`).then((res) => {
      const todos = res.data;
      this.setState({ todos });
    });
  }
  render() {
    return (
      <div>
        <h1>Welcome to Todos</h1>
        <ul>
          {this.state.todos.map((todo) => (
            <li key={todo.todoID} >
                <b>{todo.Title}</b>
                <br/>
                <p>{todo.Description} by -- <b>{todo.userHandle}</b></p>
                </li>
          ))}
        </ul>
      </div>
    );
  }
}