import React, { Component } from "react";

export default class signup extends Component {
  render() {
    return (
      <div>
        <h1>Signup Form</h1>
        <form style={{ marginTop: 50 }}>
          <label>
            UserName:
            <input type="text" name="username" value="username" />
          </label>
          <br/>
          <label>
            Email:
            <input type="text" name="email" value="email" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value="" />
          </label>
          <br />
          <label>
            Confirm password:
            <input
              type="password"
              name="confirmPassword"
              value=""
            />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
