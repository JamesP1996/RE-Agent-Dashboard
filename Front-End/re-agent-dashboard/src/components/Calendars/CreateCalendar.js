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
import MomentUtils from "@date-io/moment";
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";

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
      title: "",
      description: "",
      start: "",
      end: "",
      allDay: false,
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
      title: this.state.title,
      description: this.state.description,
      start: this.state.start,
      end: this.state.end,
      allDay: this.state.allDay
    };
    if(newCalendar.allDay === true){
      newCalendar.end = "";
  }
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

  handleStartDateChange(date) {
    this.setState({
      start: date
    });
  }

  handleEndDateChange(date) {
    this.setState({
      end: date
    });
  }

  handleCheckChange = (e) => {
    const { checked } = e.target;
    this.setState({
      allDay: checked,
    });
  };

  render() {
    document.title = "Create Calendar Entry";
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <MuiPickersUtilsProvider utils={MomentUtils}>
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
                label="Title of Event"
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
                label="Description of Event"
                className={classes.textField}
                helperText={errors.description}
                error={errors.description ? true : false}
                value={this.state.description}
                onChange={this.handleChange}
              />
              <br></br>
              <p>Start Date-Time:</p>
              <DateTimePicker
                value={this.state.start}
                selected={this.state.start}
                onChange={(e) => this.handleStartDateChange(e)}
              />
              <p>End Date-Time:</p>
              <DateTimePicker
                value={this.state.end}
                selected={this.state.end}
                onChange={(e) => this.handleEndDateChange(e)}
              />
              <p>All Day?</p>
              <input
                type="checkbox"
                onChange={(e) => this.handleCheckChange(e)}
                defaultChecked={this.state.allDay}
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
      </MuiPickersUtilsProvider>
    );
  }
}
CreateCalendar.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(CreateCalendar);
