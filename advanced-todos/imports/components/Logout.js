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

const styles = theme => ({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

class Logout extends Component {

  render() {

    const nome = Meteor.user().profile.nome;

    return (

      <Grid container style={styles.container}>
        <Typography variant="button" gutterBottom>
        Logado como {nome}
        </Typography>
        <Button
          style={styles.button}
          label="Log Out"
          primary="true"
          variant="contained"
          type='submit'
          onClick={() => Meteor.logout()}
          endIcon={<Icon>send</Icon>}>
          <Typography style={styles.buttonText}> Log Out </Typography>
        </Button>
      </Grid>
    );
  }
}

export default withStyles(styles)((Logout));
