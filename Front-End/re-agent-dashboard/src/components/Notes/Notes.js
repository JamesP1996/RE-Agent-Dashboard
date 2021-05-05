import { Container, Grid, Typography } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import NoteCard from "./NoteCard";
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

export default function Notes() {
  const [notes,setNotes] = useState([])

  useEffect(() => {
    document.title = "Note Cards";
    axios
      .get("/notes")
      .then((response) => {
        setNotes(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  },[])

  const handleDelete = async (id) => {
    await axios.delete("/notes/" + id)
    .then(res =>{
      console.log(res);
      const newNotes = notes.filter(note => note.noteID !== id)
      setNotes(newNotes);
    })
  }

  


  return (
    <Container>
      <Typography variant="h4">Notes</Typography>
      <Grid container spacing={3} style={{paddingTop:"20px"}}>
        {notes.map(note =>(
          <Grid item key={note.noteID} xs={12} md={6} lg={4}>
            <NoteCard note={note} handleDelete={handleDelete}/>
          </Grid>
        ))}
      </Grid>
      <Fab color="secondary" title="Add Note" href="/createNote" style={{marginTop:"20px"}}>
        <AddIcon/>
      </Fab>
    </Container>
  )
}


