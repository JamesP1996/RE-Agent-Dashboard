import React, { Component } from "react";
import { StyledLogin, StyledSignup } from "../util/MUIStyles/buttons";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";

export class home extends Component {
  render() {
    return (
    <body className="home-body">
      <div className="home">
        <Grid className="home-grid">
          <Container xs={12} sm={6} maxWidth="lg" maxheight="lg" className="home-container" align="center" >
              <Typography variant="h2" gutterBottom>
                Real Estate Agent <br/>Dashboard
              </Typography>
              <StyledLogin></StyledLogin>
              <StyledSignup></StyledSignup>
          </Container>
        </Grid>
      </div>
    </body>
    );
  }
}

export default home;
