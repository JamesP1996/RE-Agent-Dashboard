import {makeStyles} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import {Link} from "react-router-dom/";

const useStyles = makeStyles({
    login: {
      background: 'linear-gradient(to right, #8e2de2, #4a00e0);',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      color: 'white',
      height: "30%",
      padding: '0 30px',
      margin:'10px',
      "min-height":'56px',
      width: "30%"
    },
    signup:{
      background: 'linear-gradient(to right, #da22ff, #9733ee);',
      border: 0,
      borderRadius: 3,
      boxShadow: '0 3px 5px 2px rgba(225, 105, 135, .3)',
      color: 'white',
      height: "30%",
      padding: '0 30px',
      margin:'10px',
      "min-height":'56px',
      width: "30%",
      "&:hover": {
        backgroundColor: "#000 !important" ,
        }
    }
  });

export function StyledLogin(){
    const classes = useStyles();
    return <Button 
    component={Link}
    variant ="contained"
    to="/Login"
    className = {classes.login}>Login</Button>
}

export function StyledSignup(){
    const classes = useStyles();
    return <Button className = {classes.signup} component={Link}
    variant ="contained"
    to="/Signup">Sign Up</Button>
}
