import React from "react";
import { Link } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import EventIcon from "@material-ui/icons/Event";
import HomeIcon from "@material-ui/icons/Home";
import NotesIcon from "@material-ui/icons/Notes";
import HouseOutlinedIcon from "@material-ui/icons/HouseOutlined";
import AppsIcon from "@material-ui/icons/Apps";
import ExitToAppRoundedIcon from '@material-ui/icons/ExitToAppRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import LaunchIcon from '@material-ui/icons/Launch';
import CallMadeIcon from '@material-ui/icons/CallMade';
import { makeStyles, useTheme } from "@material-ui/core/styles";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    marginBottom:"4rem",
    padding:"5px"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

function DrawerResponsive(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <div className={classes.toolbar} />
      <img src="https://cdn.pixabay.com/photo/2017/06/05/19/05/house-2374925_960_720.png" height="25px" width="25px"></img>
      <br />
      Menu
      <Divider />
      {localStorage.length > 0 ? (
        <div>
        <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <AppsIcon />
          </ListItemIcon>
          <ListItemText>Home</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/calendars">
          <ListItemIcon>
            <EventIcon />
          </ListItemIcon>
          <ListItemText>Calendar</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/notes">
          <ListItemIcon>
            <NotesIcon />
          </ListItemIcon>
          <ListItemText>Notes</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/todos">
          <ListItemIcon>
            <ListAltRoundedIcon/>
          </ListItemIcon>
          <ListItemText>To-Dos</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/listings">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText>Listings</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/open_houses">
          <ListItemIcon>
            <HouseOutlinedIcon />
          </ListItemIcon>
          <ListItemText>Open Houses</ListItemText>
        </ListItem>
      </List>
      <Divider/>
      <List>
        <ListItem button component={Link} to="/signout">
          <ListItemIcon>
          <ExitToAppRoundedIcon/>
          </ListItemIcon>
          <ListItemText>Sign-Out</ListItemText>
        </ListItem>
      </List>
      </div>
      ) : (
        <div>
          <List>
            <ListItem button component={Link} to="/login">
              <ListItemIcon>
                <CallMadeIcon/>
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem button component={Link} to="/signup">
              <ListItemIcon>
                <LaunchIcon/>
              </ListItemIcon>
              <ListItemText>Sign-Up</ListItemText>
            </ListItem>
          </List>
        </div>
      )}
      
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar} color="primary">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            RE-Agent-Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
}

export default DrawerResponsive;
