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

class Login extends Component {

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
    const { email, password } = this.state;
    let valid = false;

    if (email.length > 0 && password.length > 0) {
      valid = true;
    }

    if (email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    }

    return valid;
  }

  onSignIn() {
    const { email, password } = this.state;

    if (this.isValid()) {
      Meteor.loginWithPassword(email, password, (error) => {
        if (error) {
          this.setState({ error: error.reason });
        }
      });
      this.setState({email: "", password: ""});
    }
  }

  onCreateAccount(event) {

    event.preventDefault();
    return <AccountsUIWrapperRegister />;
    //abirir o registere
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


}

  render() {
    return (

      <Grid container style={styles.container}>

        <form onSubmit={this.handleSubmit}>

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
                label="Sign In"
                primary="true"
                variant="contained"
                type='submit'
                onClick={this.onSignIn.bind(this)}
                endIcon={<Icon>send</Icon>}>
                <Typography style={styles.buttonText}> Sign In </Typography>
              </Button>

                <Button
                  style={styles.button}
                  label="Create Account"
                  primary="true"
                  variant="contained"
                  type='submit'
                  onClick={this.onCreateAccount.bind(this)}
                  endIcon={<Icon>send</Icon>}>
                  <Typography style={styles.buttonText}> Create Account </Typography>
                </Button>
            </form>
      </Grid>
    );
  }
}

export default withStyles(styles)((Login));
