import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import axios from "axios";

// Material UI Imports
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";

// Material UI Styles
const styles = {
    form: {
      textAlign: "center",
    },
    pageTitle: {
      margin: "10px auto 10px auto",
    },
    textField: {
      margin: "10px auto 10px auto",
    },
    button: {
      marginTop: 20,
      position: "relative",
    },
    customError: {
      color: "red",
      fontSize: "0.8rem",
      marginTop: "10px",
    },
    progress: {
      position: "absolute",
    },
  };

class EditTodo extends React.Component
{
    constructor() {
        super();
        this.state = {
          Title: "",
          Description: "",
          loading: false,
          errors: {},
        };
      }

      
      componentDidMount() {
        console.log(this.props.match.params.todoID);
        axios
          .get("/todos/"+this.props.match.params.todoID)
          .then((response) => {
            this.setState({ Title: response.data.Title,
                            Description: response.data.Description });
          })
          .catch((error) => {
            console.log(error);
          });
      }

      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
          loading: true,
        });
        const EditedTodo = {
          Title: this.state.Title,
          Description: this.state.Description,
          Checked: "Unchecked"
        };
        axios
          .put("/todos/"+this.props.match.params.todoID, EditedTodo)
          .then((res) => {
            console.log(res.data);
            this.setState({
              loading: false,
            });
            this.props.history.push("/todos");
          })
          .catch((err) => {
            this.setState({
              errors: err.response.data,
              loading: false,
            });
          });
      };

      handleChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

      render() {
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
          <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
              <Typography variant="h2" className={classes.pageTitle}>
                Edit a Todo
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="Title"
                  name="Title"
                  type="text"
                  label="Title"
                  className={classes.textField}
                  helperText={errors.Title}
                  error={errors.Title ? true : false}
                  value={this.state.Title}
                  onChange={this.handleChange}
                />
                <TextField
                  id="Description"
                  name="Description"
                  type="text"
                  label="Description"
                  className={classes.textField}
                  helperText={errors.Description}
                  error={errors.Description ? true : false}
                  value={this.state.Description}
                  onChange={this.handleChange}
                  fullWidth
                  multiline={true}
                  rows={5}
                />
                <br></br>
                {errors.error && (
                  <Typography variant="body2" className={classes.customError}>
                    Please Signup/Login to Create a Todo
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  Submit
                  {loading && (
                    <CircularProgress size={30} className={classes.progress} />
                  )}
                </Button>
              </form>
            </Grid>
            <Grid item sm />
          </Grid>
        );
      }

      
}
EditTodo.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(EditTodo);