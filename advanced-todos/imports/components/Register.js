import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

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
import MenuItem from '@material-ui/core/MenuItem';
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import { Router, Switch, Route, Link, withRouter } from 'react-router-dom'

import Grid from '@material-ui/core/Grid';

import { Users } from '../api/users.js';

import FileBase64 from 'react-file-base64';

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
    fontColor: 'red',
    marginBottom: 10,
}
});

class Register extends Component {

  constructor(props) {
   super(props);

   this.state = {
     nome: '',
     email: '',
     datadenascimento: new Date(),
     genero: '',
     empresa: '',
     photo: [],
     password: '',
     error: null,
   }

   this.onCreateAccount = this.onCreateAccount.bind(this);
   this.handleNome = this.handleNome.bind(this);
   this.handleDatadeNascimento = this.handleDatadeNascimento.bind(this);
   this.handleGenero = this.handleGenero.bind(this);
   this.handleEmpresa = this.handleEmpresa.bind(this);

   this.handleEmail = this.handleEmail.bind(this);
   this.handlePassword = this.handlePassword.bind(this);

  }

  isValid() {
    let valid = false;

    if (this.state.email.length > 0 && this.state.password.length > 0 && this.state.Nome.length > 0 && this.state.empresa.length > 0 && this.state.genero.length > 0 && this.state.datadenascimento.length > 0 && this.state.photo.length > 0) {
      valid = true;
    }

    if (this.state.email.length === 0) {
      this.setState({ error: 'You must enter an email address' });
    } else if (this.state.password.length === 0) {
      this.setState({ error: 'You must enter a password' });
    } else if (this.state.nome.length === 0) {
      this.setState({ error: 'You must enter a name' });
    } else if (this.state.empresa.length === 0) {
      this.setState({ error: 'You must enter a company' });
    } else if (this.state.genero.length === 0) {
      this.setState({ error: 'You must enter a gender' });
    } else if (this.state.datadenascimento.length === 0) {
      this.setState({ error: 'You must enter a birthday' });
    } else if (this.state.photo.length === 0) {
      this.setState({ error: 'You must enter a photo' });
    }

    return valid;
  }

  onCreateAccount(event) {

    event.preventDefault();

    if (this.isValid()) {

      Meteor.call('Users.insert', this.state.nome,  this.state.email, this.state.password, this.state.datadenascimento, this.state.genero, this.state.empresa, this.state.photo,
       (error) => {
        if(!error){
          console.log('You see this because the authentication process was a success')
        }
        else {
          this.handleError;
        }
      });
    }
  }

  handleError(event) {
   this.setState({
       error: event.currentTarget.value
     });
  }

  handleNome(event) {
   this.setState({
       nome: event.currentTarget.value
     });
  }

  handleDatadeNascimento(event) {
   this.setState({
       datadenascimento: new Date(event.currentTarget.value)
     });
  }

  handleGenero(event) {
   this.setState({
       genero: event.currentTarget.value
     });
  }

  handleEmpresa(event) {
   this.setState({
       empresa: event.currentTarget.value
     });
  }

  handlePhoto(files) {
   this.setState({
       photo: files
     });
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

  render() {
    return (

      <div className="container">
        <header>
          <div>
              <Typography variant="h4" gutterBottom>
                Seja Bem-Vindo!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Você precisa criar uma conta para acessar as tarefas.
              </Typography>
          </div>
        </header>

        <div>
        <Grid container style={styles.container}>
          <form onSubmit={this.onCreateAccount}>
            <List dense className={''}>
              <span className="text">
                <ListItem key="nome" text="true">
                  <TextField
                    type='text'
                    onChange={this.handleNome}
                    label="Nome"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="name"
                  />
                </ListItem>

                <ListItem key="datadenascimento" text="true">
                  <TextField
                    clearable="true"
                    type='date'
                    style={styles.input}
                    onChange={this.handleDatadeNascimento.bind(this)}
                    placeholder="Data de Nascimento"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="date"
                    mindate={new Date()}
                  />
                </ListItem>

                <ListItem key="genero" text="true">
                  <TextField
                    type='select'
                    style={styles.input}
                    onChange={this.handleGenero.bind(this)}
                    placeholder="Gênero"
                    value="feminino"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="date"
                    select={true}
                  >
                    <MenuItem onChange={this.handleGenero.bind(this)} value="feminino">Feminino</MenuItem>
                    <MenuItem onChange={this.handleGenero.bind(this)} value="masculino">Masculino</MenuItem>
                  </TextField>
                </ListItem>

                <ListItem key="empresa" text="true">
                  <TextField
                    type='email'
                    style={styles.input}
                    onChange={this.handleEmpresa}
                    placeholder="Empresa"
                    autoCapitalize="none"
                    autoCorrect="false"
                    keyboardtype="email-address"
                  />
                </ListItem>

                <ListItem key="file" text="true">
                <TextField
                  type='text'
                  style={styles.input}
                  placeholder="Foto"
                  disabled={true}
                  autoCapitalize="none"
                  autoCorrect="false"
                />
                  <FileBase64
                    multiple={ true }
                    onDone={ this.handlePhoto.bind(this)} />
                </ListItem>

                <ListItem key="email" text="true">
                <TextField
                  type='email'
                  style={styles.input}
                  onChange={this.handleEmail}
                  placeholder="Email"
                  autoCapitalize="none"
                  autoCorrect="false"
                  keyboardtype="email-address"
                />
                </ListItem>

                <ListItem key="password" text="true">
                <TextField
                  type='password'
                  style={styles.input}
                  onChange={this.handlePassword}
                  placeholder="Password"
                  autoCapitalize="none"
                  autoCorrect="false"
                  securetextentry="true"
                  />
                </ListItem>

                <Typography style={styles.error}> { this.state.error } </Typography>

                <ListItem>
                  <Button
                    style={styles.button}
                    label="Create Account"
                    primary="true"
                    variant="contained"
                    type='submit'
                    onClick={this.onCreateAccount.bind(this)}
                    endIcon={<Icon>send</Icon>}>
                    <Typography style={styles.buttonText}> Register </Typography>
                  </Button>
                </ListItem>
              </span>
            </List>
          </form>
        </Grid>
      </div>
    </div>
    );
  }
}

export default withStyles(styles)((Register));
