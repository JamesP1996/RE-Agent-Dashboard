import React, { Component } from "react";
import TodoItem from "./TodoItem";

class Todos extends Component {
  render() {
    return this.props.myTodos.map((todo) => {
      return <TodoItem key={todo.todoID} todo={todo}></TodoItem>;
    });
  }

}

export default Todos;
