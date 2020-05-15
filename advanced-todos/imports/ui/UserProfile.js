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
import Welcome from './routes/Welcome.js';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { withTracker } from 'meteor/react-meteor-data';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'
import PhotoCamera from '@material-ui/icons/PhotoCamera';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  }
});

// User component - represents a single todo item
class UserProfile extends Component {

  constructor(props) {
    super(props);

    let id, name, email, gender, birthday, company, photo;

    let filteredUsers = this.props.users;

    filteredUsers.map((user) => {
      id = user.name;
      name = user.name;
      email = user.email;
      gender = user.name;
      birthday = user.name;
      company = user.name;
      photo = user.name;
    });

    this.state = {
      edition: false,
      id: id,
      name: name,
      email: email,
      gender: gender,
      birthday: birthday,
      company: birthday,
    };

  }

  handleSubmit(event){

    event.preventDefault();
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

  render() {
    const { classes } = this.props;

    return (
      <div>
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
                      value="feminino"
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

                  <ListItem key="submit" text="true">
                    <Button
                      label="Submit"
                      primary="true"
                      variant="contained"
                      color="primary"
                      type='submit'
                      onClick={this.handleSubmit.bind(this)}
                      endIcon={<Icon>send</Icon>}>
                      Submit </Button>
                  </ListItem>


                </span>
              </List>
            </form>
        </div>
      </div>
    );
  }
}
export default withTracker(() => {

  Meteor.subscribe('users2', "");

  return {
    users: Users.find({}).fetch(),
    incompleteCount: Users.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(UserProfile);
