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

import About from './routes/About.js';
import EditTask from './EditTask.js';

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
  toggleChecked() {
    // Set the checked property to the opposite of its current value
    Tasks.update(this.props.task._id, {
      $set: { checked: !this.props.task.checked },
    });
  }

  deleteThisTask() {
    Tasks.remove(this.props.task._id);
  }

  editThisTask(){
    EditTask.edit(this.props.task._id);
  }

  render() {
    const { classes } = this.props;

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    return (
      <List dense className={classes.root}>
        <span className="text">
          <ListItem key={this.props.task.username} button>
            <ListItemAvatar>
              <Avatar
                alt={`Avatar n°${0 + 1}`}
                src={`/static/images/avatar/${0 + 1}.jpg`}
              />
            </ListItemAvatar>
            <ListItemText id={this.props.task.username} primary={this.props.task.text} secondary={this.props.task.username}/>
              <IconButton aria-label="edit" onClick={this.editThisTask.bind(this)}>
                <EditIcon/>
              </IconButton>

              <IconButton aria-label="delete" onClick={this.deleteThisTask.bind(this)}>
                <DeleteIcon>
                  &times
                </DeleteIcon>
              </IconButton>
          </ListItem>
        </span>
      </List>
    );
  }
}
export default withStyles(styles)(Task);
