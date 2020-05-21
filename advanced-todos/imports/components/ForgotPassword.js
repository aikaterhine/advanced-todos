import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import { makeStyles, withStyles } from '@material-ui/core/styles';

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
import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Register from './Register.js';
import AccountsUIWrapperRegister from '../ui/AccountsUIWrapperRegister.js';

import { Router, Switch, Route, Link, withRouter } from 'react-router-dom'

import { createBrowserHistory } from "history";

export const history = createBrowserHistory();

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};

const styles = theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  input: {
    fontSize: 16,
    height: 36,
    padding: 10,
    backgroundColor: '#FFFFFF',
    borderColor: '#888888',
    borderWidth: 1,
    marginHorizontal: 20,
    marginBottom: 10,
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
  error: {
    color: 'red',
    marginBottom: 10,
}
});

class ForgotPassword extends Component {

  constructor(props) {
   super(props);

   this.state = {
     email: '',
     password: '',
     error: null,

   }

   this.handleEmail = this.handleEmail.bind(this);
   this.handlePassword = this.handlePassword.bind(this);
  }

  isValid() {
    let valid = false;

    if (this.state.email.length > 0 && this.state.password.length > 0) {
      valid = true;
    }

    if (this.state.email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (this.state.password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    }

    return valid;
  }

  changePassword(event) {
    event.preventDefault();

    if (this.isValid()) {
      Meteor.call('Users.forgotpassword', this.state.password, function (error) {
        if(!error){
          console.log('Password reset was a success!')
        }
        else {
          console.log(error.reason);
          this.handleError;
        }
      });
      console.log(isLoggedIn());
    }
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

  handleError(event) {
   this.setState({
       error: event.currentTarget.value
     });
  }

  render() {
    return (
      <div className="container">
        <header>
          <div>
              <Typography variant="h4" gutterBottom>
                Seja Bem-Vindo!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Você precisa preencher o formulário abaixo para mudar sua senha.
              </Typography>
          </div>
        </header>

        <div>
          <Grid container style={styles.container}>

            <form>

                <TextField
                  type='email'
                  style={styles.input}
                  onChange={this.handleEmail}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect="false"
                  keyboardtype="email-address"
                />

                <TextField
                  type='password'
                  style={styles.input}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect="false"
                  securetextentry="true"
                  />

                  <Typography style={styles.error}> { this.state.error } </Typography>

                  <Button
                    style={styles.button}
                    label="Change"
                    primary="true"
                    variant="contained"
                    type='submit'
                    onClick={this.changePassword.bind(this)}
                    endIcon={<Icon>send</Icon>}>
                    <Typography style={styles.buttonText}> Change Password </Typography>
                  </Button>
                </form>
          </Grid>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)((ForgotPassword));
