import React, { Component } from 'react';
import { Accounts } from 'meteor/accounts-base';

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

export default class Register extends Component {

  constructor(props) {
   super(props);

   this.state = {
     nome: '',
     email: '',
     datadenascimento: '',
     genero: '',
     empresa: '',
     photo: '',
     password: '',
   }

   this.handleSubmit = this.handleSubmit.bind(this);
   this.handleNome = this.handleNome.bind(this);
   this.handleDatadeNascimento = this.handleDatadeNascimento.bind(this);
   this.handleGenero = this.handleGenero.bind(this);
   this.handleEmpresa = this.handleEmpresa.bind(this);
   this.handlePhoto = this.handlePhoto.bind(this);

   this.handleEmail = this.handleEmail.bind(this);
   this.handlePassword = this.handlePassword.bind(this);

  }

  handleNome(event) {
   this.setState({
       nome: event.currentTarget.value
     });
  }

  handleDatadeNascimento(event) {
   this.setState({
       datadenascimento: event.currentTarget.value
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

  handlePhoto(event) {
   this.setState({
       photo: event.currentTarget.value
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

handleSubmit(event) {
  event.preventDefault();

  const res = Accounts.createUser({
  nome: this.state.nome,
  datadenascimento: this.state.datadenascimento,
  genero: this.state.genero,
  empresa: this.state.empresa,
  photo: this.state.photo,
  email: this.state.email,
  password: this.state.password});
}

  render() {
    return (

      <form onSubmit={this.handleSubmit}>
        <List dense className={''}>
          <span className="text">
            <ListItem key="nome" text="true">

              <TextField
                id="outlined-helperText"
                label="Nome"
                value= {this.state.nome}
                variant="outlined"
                onChange={this.handleNome}
              />
            </ListItem>

            <ListItem key="datadenascimento" text="true">
              <TextField
                id="outlined-helperText"
                label="Data de Nascimento"
                type="date"
                value={this.state.datadenascimento}
                variant="outlined"
                onChange={this.handleDatadeNascimento.bind(this)}
              />
            </ListItem>

            <ListItem key="genero" text="true">
              <TextField
                id="outlined-helperText"
                label="Gênero"
                value="feminino"
                variant="outlined"
                onChange={this.handleGenero.bind(this)}
                select={true}
              >
                <MenuItem value="feminino">Feminino</MenuItem>
                <MenuItem value="masculino">Masculino</MenuItem>
              </TextField>
            </ListItem>

            <ListItem key="empresa" text="true">
              <TextField
                id="outlined-helperText"
                label="Empresa"
                value={this.state.empresa}
                variant="outlined"
                onChange={this.handleEmpresa}
              />
            </ListItem>

            <ListItem key="file" text="true">
              <TextField
                accept="image/*"
                className=""
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                  Upload
                </Button>
              </label>
              <input accept="image/*" className="" id="icon-button-file" type="file" />
              <label htmlFor="icon-button-file">
                <IconButton color="primary" aria-label="upload picture" component="span">
                  <PhotoCamera />
                </IconButton>
              </label>
            </ListItem>

            <ListItem key="email" text="true">
              <TextField
                id="outlined-helperText"
                label="Email"
                value={this.state.email}
                variant="outlined"
                onChange={this.handleEmail}
              />
            </ListItem>

            <ListItem key="password" text="true">
              <TextField
                id="outlined-helperText"
                label="Senha"
                value={this.state.password}
                variant="outlined"
                onChange={this.handlePassword}
              />
            </ListItem>

            <ListItem>
              <Button
                label="Submit"
                primary="true"
                variant="contained"
                color="primary"
                type='submit'
                onClick={this.handleSubmit.bind(this)}
                endIcon={<Icon>send</Icon>}>
                Submit
              </Button>
            </ListItem>

          </span>
        </List>
      </form>
    );
  }
}
