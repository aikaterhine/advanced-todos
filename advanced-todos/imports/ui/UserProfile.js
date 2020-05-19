import 'date-fns';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Users } from '../api/users.js';

import * as actions from '../actions/index.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';

import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import AccountsUIWrapperLogin from './AccountsUIWrapperLogin.js';
import Welcome from './Welcome.js';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera';

import FileBase64 from 'react-file-base64';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  },
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

redirectToHome = () => {
 const { history } = this.props;
 if(history) history.push('/');
}

// User component - represents a single todo item
class UserProfile extends Component {

  constructor(props) {
    super(props);

    if(this.props.currentUser){
      this.state = {
        edition: false,
        id: this.props.currentUser._id,
        emailOriginal: this.props.currentUser.emails[0].address,
        email: this.props.currentUser.emails[0].address,
        password: this.props.currentUser.password,
        name: this.props.currentUser.profile.nome,
        gender: this.props.currentUser.profile.genero,
        birthday: this.props.currentUser.profile.datadenascimento,
        company: this.props.currentUser.profile.empresa,
        photo: this.props.currentUser.profile.photo,
      };
    }
  }

  handleSubmit(event){

    event.preventDefault();

    Meteor.call('Users.update', this.state.id, this.state.name, this.state.emailOriginal, this.state.email, this.state.password, this.state.birthday, this.state.gender, this.state.company, this.state.photo);
    this.setState({name: "", email: "", gender: "", birthday: "", company: "", photo: ""});
  }


  handleName(event) {
    this.setState({
        name: event.target.value
      });
  }

  handleEmail(event) {
    this.setState({
        email: event.target.value
      });
  }

  handleGender(event) {
    this.setState({
        gender: event.target.value
      });
  }

  handleBirthday(event) {
    this.setState({
        birthday: event.target.value
      });
  }

  handleCompany(event) {
    this.setState({
        company: event.target.value
      });
  }

  handlePhoto(files) {
   this.setState({
       photo: files
     });
  }

  render() {
    const { classes } = this.props;
    return (
      <div>
      { this.props.currentUser ?
          <div className="container">
            <header>
                <div>
                  <Typography variant="h3" gutterBottom>
                      Todo List: User Edit
                  </Typography>
                </div>
            </header>

            <form>
              <List dense className={''}>
                <span className="text">
                  <ListItem key="name" text="true">

                    <TextField
                      id="outlined-helperText"
                      label="Nome"
                      style={styles.input}
                      value= {this.state.name}
                      variant="outlined"
                      onChange={this.handleName.bind(this)}
                    />
                  </ListItem>

                  <ListItem key="email" text="true">
                    <TextField
                      id="outlined-helperText"
                      label="Email"
                      value={this.state.email}
                      variant="outlined"
                      onChange={this.handleEmail.bind(this)}
                    />
                  </ListItem>

                  <ListItem key="birthday" text="true">
                    <TextField
                      id="outlined-helperText"
                      label="Data de Nascimento"
                      type="date"
                      value={this.state.birthday}
                      variant="outlined"
                      onChange={this.handleBirthday.bind(this)}
                    />
                  </ListItem>

                  <ListItem key="gender" text="true">
                    <TextField
                      id="outlined-helperText"
                      label="Gênero"
                      variant="outlined"
                      onChange={this.handleGender.bind(this)}
                      select={true}
                    >
                      <MenuItem value="feminino">Feminino</MenuItem>
                      <MenuItem value="masculino">Masculino</MenuItem>
                    </TextField>
                  </ListItem>

                  <ListItem key="company" text="true">
                    <TextField
                      id="outlined-helperText"
                      label="Empresa"
                      value={this.state.company}
                      variant="outlined"
                      onChange={this.handleCompany.bind(this)}
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

                  <Typography style={styles.error}> { this.state.error } </Typography>

                  <ListItem key="submit" text="true">
                    <Button
                      style={styles.button}
                      label="Submit"
                      primary="true"
                      variant="contained"
                      type='submit'
                      onClick={this.handleSubmit.bind(this)}
                      endIcon={<Icon>send</Icon>}>
                      <Typography style={styles.buttonText}> Submit </Typography>
                    </Button>
                  </ListItem>
                </span>
              </List>
            </form>
        </div> : <div> <Welcome /> </div>
      }
      </div>
    );
  }
}
export default withTracker(() => {

  Meteor.subscribe('Users', "");

  return {
    users: Users.find({}).fetch(),
    incompleteCount: Users.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(withRouter(UserProfile));
