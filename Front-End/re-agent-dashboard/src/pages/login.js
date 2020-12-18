import React, { Component } from "react";

export default class login extends Component {
  render() {
    return (
      <div>
        <h1>Login Form</h1>
        <form style={{ marginTop: 50 }}>
          <label>
            UserName:
            <input type="text" name="username" value="username" />
          </label>
          <br />
          <label>
            Password:
            <input type="password" name="password" value="password" />
          </label>
          <br />
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
