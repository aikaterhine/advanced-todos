import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
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
import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';

export default class Login extends Component {

  constructor(props) {
   super(props);

   this.state = {
     email: '',
     password: '',
   }

   this.handleEmail = this.handleEmail.bind(this);
   this.handlePassword = this.handlePassword.bind(this);

  }

  handleEmail(event) {
   this.setState({
       email: event.currentTarget.value
     });
  }

  handlePassword(event) {
   this.setState({
       password: event.currentTarget.value
     });
  }

  handleSubmit(event) {

    event.preventDefault();

    Meteor.loginWithPassword(this.state.email, this.state.password, (err) => {
      if(err) {
        console.log(err.reason);
        return;
      } else {
        console.log(Meteor.user());
      }
      console.log(Meteor.user());

    });
}

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Email
          <input
            type="email"
            onChange={this.handleEmail}
          />
        </label>
        <label>
          Password
          <input
            type="password"
            onChange={this.handlePassword}
          />
        </label>
        <Button
          label="Submit"
          primary="true"
          variant="contained"
          color="primary"
          type='submit'
          onClick={this.handleSubmit.bind(this)}
          endIcon={<Icon>send</Icon>}>
          Submit </Button>
      </form>
    );
  }
}
