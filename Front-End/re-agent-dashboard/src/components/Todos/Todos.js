import { Container, Grid } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import TodoCard from "./TodoCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Todos() {
  const [todos,setTodos] = useState([])

  useEffect(() => {
    document.title = "Todos";
    axios
      .get("/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleDelete = async (id) => {
    await axios.delete("/todos/" + id)
    .then(res =>{
      console.log(res);
      const newTodos = todos.filter(todo => todo.todoID !== id)
      setTodos(newTodos);
    })
  }

  


  return (
    <Container>
      <Grid container spacing={3}>
        {todos.map(todo =>(
          <Grid item key={todo.todoID} xs={12} md={6} lg={4}>
            <TodoCard todo={todo} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
      <Fab color="secondary" title="Add Todo" href="/createTodo" style={{marginTop:"20px"}}>
        <AddIcon/>
      </Fab>
    </Container>
  )
}


