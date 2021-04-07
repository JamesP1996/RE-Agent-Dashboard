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

class CreateCalendar extends React.Component {
  constructor() {
    super();
    this.state = {
      Title: "",
      Description: "",
      Date: "",
      loading: false,
      errors: {},
    };
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({
      loading: true,
    });
    const newCalendar = {
      Title: this.state.title,
      Description: this.state.description,
      Date: this.state.date,
    };
    axios
      .post("/calendars", newCalendar)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });
        this.props.history.push("/calendars");
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
            Create a Calendar Entry
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="title"
              name="title"
              type="text"
              label="Title"
              className={classes.textField}
              helperText={errors.title}
              error={errors.title ? true : false}
              value={this.state.title}
              onChange={this.handleChange}
            />
            <TextField
              id="description"
              name="description"
              type="text"
              label="Description"
              className={classes.textField}
              helperText={errors.description}
              error={errors.description ? true : false}
              value={this.state.description}
              onChange={this.handleChange}
            />
            <br></br>
            <p>Date Entry:</p>
            <TextField
              id="date"
              name="date"
              type="date"
              className={classes.textField}
              helperText={errors.date}
              error={errors.date ? true : false}
              value={this.state.date}
              onChange={this.handleChange}
            />
            <br></br>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                Please Signup/Login to Create Calendar Entries
              </Typography>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.button}
              disabled={loading}
            >
              Create Calendar
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
CreateCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CreateCalendar);
