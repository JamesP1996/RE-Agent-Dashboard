import React from 'react'
import {Route,Redirect} from 'react-router-dom';

// Selectional rendering of components based on the users authentication status.
// Known as <AuthRoute> in App.js
const AuthRoute = ({ component:Component, authenticated, ...rest }) => (
    <Route
    {...rest}
    render = {(props) => authenticated === true ? <Redirect to="/"/> : <Component {...props}/>
    }
    />
);
export default AuthRoute;