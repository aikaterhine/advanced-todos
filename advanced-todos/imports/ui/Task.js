import React, { Component } from 'react';

import { Tasks } from '../api/tasks.js';

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Checkbox from '@material-ui/core/Checkbox';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

import CheckboxListSecondary from '../components/CheckboxListSecondary.js';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
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

  render() {
    const { classes } = this.props;

    // Give tasks a different className when they are checked off,
    // so that we can style them nicely in CSS
    const taskClassName = this.props.task.checked ? 'checked' : '';

    /*<button className="delete" onClick={this.deleteThisTask.bind(this)}>
      &times;
    </button>

    <input
      type="checkbox"
      readOnly
      checked={!!this.props.task.checked}
      onClick={this.toggleChecked.bind(this)}
    />*/

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
            <ListItemSecondaryAction>
            </ListItemSecondaryAction>
          </ListItem>
        </span>
      </List>
    );
  }
}
export default withStyles(styles)(Task);
