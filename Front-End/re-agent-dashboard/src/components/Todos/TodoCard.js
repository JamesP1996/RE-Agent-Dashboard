import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    IconButton,
    Typography,
  } from "@material-ui/core";
  import CheckCircleIcon from '@material-ui/icons/CheckCircle';
  import React from "react";
  
  export default function TodoCard({ todo, handleDelete }) {
    document.title = "Todo Cards";
    return (
      <div>
        <Card elevation={1}>
          <CardHeader title={todo.Title} />
          <CardContent>
            <Typography variant="body2" color="textSecondary">
              {todo.Description}
            </Typography>
          </CardContent>
          <CardActions style={{paddingLeft:"32%"}}>
            <IconButton color="primary"title="Mark As Done" aria-label="Mark as Done" onClick={() => handleDelete(todo.todoID)}>
            <Typography variant="body2" > Mark as Done</Typography>
              <CheckCircleIcon />
            </IconButton>
          </CardActions>
        </Card>
      </div>
    );
  }
  