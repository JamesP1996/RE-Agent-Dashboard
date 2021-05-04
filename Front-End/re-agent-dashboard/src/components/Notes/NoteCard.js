import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import React from "react";

export default function NoteCard({ note, handleDelete }) {
  document.title = "Note Cards";
  return (
    <div>
      <Card elevation={1}>
        <CardHeader title={note.title} />
        <CardContent>
          <Typography variant="body2" color="textSecondary">
            {note.description}
          </Typography>
        </CardContent>
        <CardActions disableSpacing style={{paddingLeft:"35%"}}>
          <IconButton title="Edit" aria-label="Edit" href={"/notes/edit/"+note.noteID}>
            <CreateOutlinedIcon />
          </IconButton>
          <IconButton color="secondary" title="Delete" aria-label="Delete" onClick={() =>
            {if(window.confirm('Are you sure you wish to delete this item?')) handleDelete(note.noteID) }}>
            <DeleteOutlinedIcon />
          </IconButton>
        </CardActions>
      </Card>
    </div>
  );
}
