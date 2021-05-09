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
class CreateAttendee extends React.Component
{
    constructor() {
        super();
        this.state = {
          full_Name: "",
          number: "",
          email: "",
          contacted: false,
          interested: false,
          loading: false,
          errors: {},
        };
      }

      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
          loading: true,
        });
        const newAttendee = {
          full_Name: this.state.full_Name,
          number: this.state.number,
          email: this.state.email,
          contacted: this.state.contacted,
          interesed: this.state.interested
        };
        axios
          .post(`/attendees/${this.props.match.params.houseID}`, newAttendee)
          .then((res) => {
            console.log(res.data);
            this.setState({
              loading: false,
            });
            this.props.history.push(`/attendees/${this.props.match.params.houseID}`);
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
        document.title = "Create Attendee";
        const { classes } = this.props;
        const { errors, loading } = this.state;
        return (
          <Grid container className={classes.form}>
            <Grid item sm />
            <Grid item sm>
              <Typography variant="h2" className={classes.pageTitle}>
                Create a Attendee
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="full_Name"
                  name="full_Name"
                  type="text"
                  label="Full Name of Attendee"
                  className={classes.textField}
                  helperText={errors.full_Name}
                  error={errors.full_Name ? true : false}
                  value={this.state.full_Name}
                  onChange={this.handleChange}
                />
                <TextField
                  id="number"
                  name="number"
                  type="text"
                  label="Phone Number"
                  className={classes.textField}
                  helperText={errors.number}
                  error={errors.number ? true : false}
                  value={this.state.number}
                  onChange={this.handleChange}
                />
                <TextField
                  id="email"
                  name="email"
                  type="text"
                  label="Email Address"
                  className={classes.textField}
                  helperText={errors.email}
                  error={errors.email ? true : false}
                  value={this.state.email}
                  onChange={this.handleChange}
                />
                <br></br>
                {errors.error && (
                  <Typography variant="body2" className={classes.customError}>
                    Please Signup/Login to Create Attendees
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
CreateAttendee.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(CreateAttendee);