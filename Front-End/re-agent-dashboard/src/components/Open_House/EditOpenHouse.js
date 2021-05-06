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

class EditOpenHouse extends React.Component {
  constructor() {
    super();
    this.state = {
      property_Name: "",
      sqft: "",
      sqft_Lot: "",
      address: "",
      date: "",
      sellers_Names: "",
      price: "",
      imageUrl:"",

      loading: false,
      errors: {},
    };
  }

  componentDidMount() {
    axios
      .get("/open_houses/"+this.props.match.params.id)
      .then((response) => {
        this.setState({
          property_Name: response.data.property_Name,
          sqft: response.data.sqft,
          sqft_Lot: response.data.sqft_Lot,
          address: response.data.address,
          date: response.data.date,
          sellers_Names: response.data.sellers_Names,
          price: response.data.price,
          imageUrl: response.data.imageUrl
        });
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
    const editedHouse = {
      property_Name: this.state.property_Name,
      sqft: this.state.sqft,
      sqft_Lot: this.state.sqft_Lot,
      address: this.state.address,
      date: this.state.date,
      sellers_Names: this.state.sellers_Names,
      price: this.state.price,
      imageUrl: this.state.imageUrl
    };

    axios
      .put("/open_houses/" + this.props.match.params.id, editedHouse)
      .then((res) => {
        console.log(res.data);
        this.setState({
          loading: false,
        });

        this.props.history.push("/open_houses/"+this.props.match.params.id);
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
    document.title = "Edit Open House";
    const { classes } = this.props;
    const { errors, loading } = this.state;
    return (
      <Grid container className={classes.form}>
        <Grid item sm />
        <Grid item sm>
          <Typography variant="h2" className={classes.pageTitle}>
            Edit this Open House Entry
          </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="property_Name"
              name="property_Name"
              type="text"
              label="Property Name"
              className={classes.textField}
              helperText={errors.property_Name}
              error={errors.property_Name ? true : false}
              value={this.state.property_Name}
              onChange={this.handleChange}
            />
            <TextField
              id="sqft"
              name="sqft"
              type="text"
              label="Square FT"
              className={classes.textField}
              helperText={errors.sqft}
              error={errors.sqft ? true : false}
              value={this.state.sqft}
              onChange={this.handleChange}
            />
            <TextField
              id="sqft_Lot"
              name="sqft_Lot"
              type="text"
              label="Square FT Lot"
              className={classes.textField}
              helperText={errors.sqft_Lot}
              error={errors.sqft_Lot ? true : false}
              value={this.state.sqft_Lot}
              onChange={this.handleChange}
            />
            <TextField
              id="address"
              name="address"
              type="text"
              label="Address"
              className={classes.textField}
              helperText={errors.address}
              error={errors.address ? true : false}
              value={this.state.address}
              onChange={this.handleChange}
              fullWidth
              multiline={true}
              rows={5}
            />
            <p>Date of Open House:</p>
            <TextField
              id="date"
              name="date"
              type="date"
              className={classes.textField}
              helperText={errors.date}
              error={errors.date ? true : false}
              value={this.state.date}
              onChange={this.handleChange}
              fullWidth
            />
            <br />
            <TextField
              id="sellers_Names"
              name="sellers_Names"
              type="text"
              label="Seller's Names"
              className={classes.textField}
              helperText={errors.sellers_Names}
              error={errors.sellers_Names ? true : false}
              value={this.state.sellers_Names}
              onChange={this.handleChange}
              fullWidth
            />
            <TextField
              id="price"
              name="price"
              type="text"
              label="Price of the Property"
              className={classes.textField}
              helperText={errors.price}
              error={errors.price ? true : false}
              value={this.state.price}
              onChange={this.handleChange}
            />
            <br></br>
            {errors.error && (
              <Typography variant="body2" className={classes.customError}>
                Please Signup/Login to Create a Open House Entry
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
EditOpenHouse.propTypes = {
  classes: PropTypes.object.isRequired,
};
export default withStyles(styles)(EditOpenHouse);
