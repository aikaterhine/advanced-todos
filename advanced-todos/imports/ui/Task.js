import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import EditIcon from '@material-ui/icons/Edit';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

import { Router, Switch, Route, Link, withRouter } from 'react-router-dom'

import About from './routes/About.js';
import App from './App.js';
import EditTask from './EditTask.js';
import DashBoard from './DashBoard.js';
import classnames from 'classnames';
import { createBrowserHistory } from "history";

const history = createBrowserHistory();

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  }
});

// Task component - represents a single todo item
class Task extends Component {

  constructor(props) {
    super(props);

    this.state = {
      visibility: this.props.visibility,
    };
    this.deleteThisTask = this.deleteThisTask.bind(this);
    this.openThisTask = this.openThisTask.bind(this);
  }

  deleteThisTask() {
    Meteor.call('tasks.remove', this.props.task._id);
  }

  togglePrivate() {
    Meteor.call('tasks.setPrivate', this.props.task._id, ! this.props.task.private);
  }

  openThisTask = () => {
    Meteor.call('tasks.setModeEdition', this.props.task._id, true);
    const url = "/edittasks/" + this.props.task._id;
    console.log(this.props.task._id);
    <Route path={url} component={EditTask} />
    this.props.history.push(url);
  }

  render() {
    const { classes } = this.props;

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = classnames({
      checked: this.props.task.checked,
      private: this.props.task.private,
    });

    const url = "/edittasks/:" + this.props.task._id;

    return (
      <div className={classes.root}>
        <Router history={this.props.history}>

        <List dense className={taskClassName}>

          <span className="text">
            <ListItem key={this.props.task.username} button>

              <ListItemAvatar>
                <Avatar
                  alt={`Avatar n°${0 + 1}`}
                  src={`/static/images/avatar/${0 + 1}.jpg`}
                />
              </ListItemAvatar>
              <ListItemText id={this.props.task.username} primary={this.props.task.name} secondary={this.props.task.username}/>

              { this.props.showPrivateButton ? (
                <IconButton className="toggle-private" onClick={this.togglePrivate.bind(this)}>
                  { this.props.task.private ?  <VisibilityOffIcon /> : <VisibilityIcon /> }
                </IconButton>
              ) : ''
              }

              { this.props.currentUser.username == this.props.task.username ?

                  <IconButton aria-label="open" onClick={this.openThisTask}>
                    <OpenInNewIcon/>
                  </IconButton> : ''
              }

              { this.props.currentUser.username == this.props.task.username ?
                <IconButton aria-label="delete" onClick={this.deleteThisTask}>
                  <DeleteIcon>
                    &times
                  </DeleteIcon>
                </IconButton> : ''
              }

            </ListItem>
          </span>
        </List>
      </Router>
    </div>
    );
  }
}
export default withStyles(styles)(withRouter(Task));
