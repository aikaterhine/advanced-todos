import React, { useState, Fragment } from 'react';
import clsx from 'clsx';
import { Router, Route, Link, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import AccountsUIWrapperLogin from '../ui/AccountsUIWrapperLogin.js';
import AccountsUIWrapperLogout from '../ui/AccountsUIWrapperLogout.js';
import AccountsUIWrapperRegister from '../ui/AccountsUIWrapperRegister.js';
import AccountsUIWrapperForgotPassword from '../ui/AccountsUIWrapperForgotPassword.js';

import App from '../ui/App.js';
import UserProfile from '../ui/UserProfile.js';
import Welcome from '../ui/Welcome.js';

import DashBoard from '../ui/DashBoard.js';
import Grid from "./ImageGridList.js";
import EditTask from '../ui/EditTask.js';
import Login from './Login.js';
import Logout from './Logout.js';
import MenuListComposition from './MenuListComposition.js';
import Register from './Register.js';

import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';

import Icon from '@material-ui/core/Icon';
import Button from '@material-ui/core/Button';

const drawerWidth = 240;
export const history = createBrowserHistory();

const requireAuth = (nextState, replace) => {
  if (isLoggedOut()) {
    replace({
      pathname: '/welcome',
    });
  }
};

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};
export const isLoggedOut = () => {
  return !Meteor.userId();
};

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  flex: {
    flex: 1
  },
  drawerPaper: {
    position: "relative",
    width: drawerWidth
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  toolbarMargin: theme.mixins.toolbar,
  aboveDrawer: {
    zIndex: theme.zIndex.drawer + 1
  },
  button: {
    backgroundColor: '#3B5998',
    padding: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '500',
    fontSize: 16,
  },
});

const MyToolbar = withStyles(styles)(
  ({ classes, title, onMenuClick }) => (
    <Fragment>
      <AppBar className={classes.aboveDrawer}>
        <Toolbar>
          <IconButton
            className={classes.menuButton}
            color="inherit"
            aria-label="Menu"
            onClick={onMenuClick}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            color="inherit"
            className={classes.flex}
          >
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.toolbarMargin} />
    </Fragment>
  )
);

const MyDrawer = withStyles(styles)(
  ({ classes, variant, open, onClose, onItemClick }) => (
    <Router history={history}>
    <Drawer variant={variant} open={open} onClose={onClose}
                classes={{
                  paper: classes.drawerPaper
                }}
    >
      <div
        className={clsx({
          [classes.toolbarMargin]: variant === 'persistent'
        })}
      />
      <List>
        <ListItem button component={Link} to="/" onClick={onItemClick('DashBoard')}>
          <ListItemText>DashBoard</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/userprofile" onClick={onItemClick('User Profile')}>
          <ListItemText>User Profile</ListItemText>
        </ListItem>
        <ListItem button component={Link} to="/tasks" onClick={onItemClick('Tasks')}>
          <ListItemText>Tasks</ListItemText>
        </ListItem>

        {isLoggedIn() ?
          <ListItem>
            <AccountsUIWrapperLogout />
          </ListItem> :

            <ListItem button component={Link} to="/login" onClick={onItemClick('Login')}>
              <Button
                style={styles.button}
                label="Login"
                primary="true"
                variant="contained"
                type='submit'
                endIcon={<Icon>send</Icon>}>
              <Typography style={styles.buttonText}> Login </Typography>
            </Button>
        </ListItem> }

        {isLoggedIn() ? "" :

            <ListItem button component={Link} to="/forgotpassword" onClick={onItemClick('Forgot Password')}>
              <Button
                style={styles.button}
                label="ForgotPassword"
                primary="true"
                variant="contained"
                type='submit'
                endIcon={<Icon>send</Icon>}>
              <Typography style={styles.buttonText}> Forgot Password </Typography>
            </Button>
        </ListItem> }

        {isLoggedIn() ? "" :
          <ListItem button component={Link} to="/register" onClick={onItemClick('Register')}>
              <Button
                style={styles.button}
                label="Create Account"
                primary="true"
                variant="contained"
                type='submit'
                endIcon={<Icon>send</Icon>}>
                <Typography style={styles.buttonText}> Create Account </Typography>
              </Button>
          </ListItem>
        }
      </List>
    </Drawer>
    <main className={classes.content}>
        <Route exact onEnter={requireAuth} path="/tasks" component={App} />
        <Route exact onEnter={requireAuth} path="/userprofile" component={UserProfile} />
        <Route exact onEnter={requireAuth} path="/welcome" component={Welcome} />
        <Route exact onEnter={requireAuth} path="/login" component={AccountsUIWrapperLogin} />
        <Route exact onEnter={requireAuth} path="/logout" component={AccountsUIWrapperLogout} />
        <Route exact onEnter={requireAuth} path="/forgotpassword" component={AccountsUIWrapperForgotPassword} />
        <Route exact onEnter={requireAuth} path="/register" component={AccountsUIWrapperRegister} />
        <Route exact onEnter={requireAuth} path="/edittasks/:idTask" component={EditTask} />
        <Route onEnter={requireAuth} path="/" component={DashBoard} />
    </main>
    </Router>
  )
);

function AppBarInteraction({ classes, variant }) {
  const [drawer, setDrawer] = useState(false);
  const [title, setTitle] = useState('DashBoard');

  const toggleDrawer = () => {
    setDrawer(!drawer);
  };

  const onItemClick = title => () => {
    setTitle(title);
    setDrawer(variant === 'temporary' ? false : drawer);
    setDrawer(!drawer);
  };

  return (
    <div className={classes.root}>
      <MyToolbar title={title} onMenuClick={toggleDrawer} />
      <MyDrawer
        open={drawer}
        onClose={toggleDrawer}
        onItemClick={onItemClick}
        variant={variant}
      />
    </div>
  );
}

export default withStyles(styles)((AppBarInteraction));
