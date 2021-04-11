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

class CreateListing extends React.Component
{
    constructor() {
        super();
        this.state = {
            owners: "",
            sqft: "",
            sqft_Lot: "",
            address: "",
            price: "",

            style: "",
            stories: "",
            bedrooms: "",
            bathrooms: "",
            cooling: "",
            heating: "",
            parking: "",
            basement: "",
            other_Features: "",
            imageUrl: "",

          loading: false,
          errors: {},
        };
      }

      handleSubmit = (event) => {
        event.preventDefault();
        this.setState({
          loading: true,
        });
        const newListing = {
            owners: this.state.owners,
            sqft: this.state.sqft,
            sqft_Lot: this.state.sqft_Lot,
            address: this.state.address,
            price: this.state.price,
            style: this.state.style,
            stories: this.state.stories,
            bedrooms: this.state.bedrooms,
            bathrooms: this.state.bathrooms,
            cooling: this.state.cooling,
            heating: this.state.heating,
            parking: this.state.parking,
            basement: this.state.basement,
            other_Features: this.state.other_Features,
            imageUrl: this.state.imageUrl
        };

        axios
          .post("/listings", newListing)
          .then((res) => {
            console.log(res.data);
            this.setState({
              loading: false,
            });
          
            this.props.history.push("/listings");
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
                Create a Listing
              </Typography>
              <form noValidate onSubmit={this.handleSubmit}>
                <TextField
                  id="owners"
                  name="owners"
                  type="text"
                  label="Owners Name's"
                  className={classes.textField}
                  helperText={errors.owners}
                  error={errors.owners ? true : false}
                  value={this.state.owners}
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
                />
                <TextField
                  id="price"
                  name="price"
                  type="price"
                  label="Price"
                  className={classes.textField}
                  helperText={errors.price}
                  error={errors.price ? true : false}
                  value={this.state.price}
                  onChange={this.handleChange}
                />
                <TextField
                  id="style"
                  name="style"
                  type="text"
                  label="House Style"
                  className={classes.textField}
                  helperText={errors.style}
                  error={errors.style ? true : false}
                  value={this.state.style}
                  onChange={this.handleChange}
                />
                <TextField
                  id="stories"
                  name="stories"
                  type="text"
                  label="Stories(Floors)"
                  className={classes.textField}
                  helperText={errors.stories}
                  error={errors.stories ? true : false}
                  value={this.state.stories}
                  onChange={this.handleChange}
                />
                <TextField
                  id="bedrooms"
                  name="bedrooms"
                  type="text"
                  label="Number of Bedrooms"
                  className={classes.textField}
                  helperText={errors.bedrooms}
                  error={errors.bedrooms ? true : false}
                  value={this.state.bedrooms}
                  onChange={this.handleChange}
                />
                <TextField
                  id="bathrooms"
                  name="bathrooms"
                  type="text"
                  label="Number of Bathrooms"
                  className={classes.textField}
                  helperText={errors.bathrooms}
                  error={errors.bathrooms ? true : false}
                  value={this.state.bathrooms}
                  onChange={this.handleChange}
                />
                <TextField
                  id="cooling"
                  name="cooling"
                  type="text"
                  label="Cooling Type"
                  className={classes.textField}
                  helperText={errors.cooling}
                  error={errors.cooling ? true : false}
                  value={this.state.cooling}
                  onChange={this.handleChange}
                />
                <TextField
                  id="heating"
                  name="heating"
                  type="text"
                  label="Heating Type"
                  className={classes.textField}
                  helperText={errors.heating}
                  error={errors.heating ? true : false}
                  value={this.state.heating}
                  onChange={this.handleChange}
                />
                <TextField
                  id="parking"
                  name="parking"
                  type="text"
                  label="Parking Desc."
                  className={classes.textField}
                  helperText={errors.parking}
                  error={errors.parking ? true : false}
                  value={this.state.parking}
                  onChange={this.handleChange}
                />
                <TextField
                  id="basement"
                  name="basement"
                  type="text"
                  label="Basement Desc."
                  className={classes.textField}
                  helperText={errors.basement}
                  error={errors.basement ? true : false}
                  value={this.state.basement}
                  onChange={this.handleChange}
                />
                <TextField
                  id="other_Features"
                  name="other_Features"
                  type="text"
                  label="Description of Other Features"
                  className={classes.textField}
                  helperText={errors.other_Features}
                  error={errors.other_Features ? true : false}
                  value={this.state.other_Features}
                  onChange={this.handleChange}
                  fullWidth={true}
                />
                <br></br>
                {errors.error && (
                  <Typography variant="body2" className={classes.customError}>
                    Please Signup/Login to Create a Listing
                  </Typography>
                )}
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  disabled={loading}
                >
                  Create Listing Entry
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
CreateListing.propTypes = {
    classes: PropTypes.object.isRequired,
  };
  export default withStyles(styles)(CreateListing);