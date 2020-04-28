import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import TextField from '@material-ui/core/TextField';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import * as actions from '../actions/index.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'

import Dialog from '@material-ui/core/Dialog';

import { Tasks } from '../api/tasks.js';
import Task from '../ui/Task.js';


// AddChoreForm component - represents the add task
class AddChoreForm extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      open: false,
    };


    this.handleName = this.handleName.bind(this);
    this.handleDescription = this.handleDescription.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  handleName(event) {
    this.setState({
        name: event.target.value
      });
  }

  handleDescription(event) {
    this.setState({
        description: event.target.value
      });
  }

  handleSubmit(event){

    event.preventDefault();

    const newTask = {
      name: this.state.name,
      description: this.state.description,
      state: "Cadastrada",
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    };

    Tasks.insert(newTask);
    this.handleClose()
    this.setState({name: "", description: ""});
  }

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  render() {

    const actions = [
      <Button
        label="Submit"
        primary="true"
        variant="contained"
        color="primary"
        type='submit'
        onClick={this.handleSubmit}
        endIcon={<Icon>send</Icon>}>Submit</Button>,

        <Button
          label="Cancel"
          primary="true"
          variant="contained"
          color="secondary"
          onClick={this.handleClose}
          endIcon={<Icon>send</Icon>}>Cancel</Button>,
    ];


    return (
      <div>
        <Button tooltip="Add Chore" onClick={this.handleOpen}>
          <Icon color="action"> add_circle </Icon>
        </Button>

        <Dialog
          title="Add a Chore"
          modal="true"
          open={this.state.open}>

          <form>
            <TextField
              label="Nome"
              hinttext="Digite para adicionar..."
              variant="outlined"
              value={this.state.name}
              onChange={this.handleName}
            />

            <TextField
              label="Descrição"
              hinttext="Digite para adicionar..."
              variant="outlined"
              value={this.state.description}
              onChange={this.handleDescription}
            />

            <Button
              label="Submit"
              primary="true"
              variant="contained"
              color="primary"
              type='submit'
              onClick={this.handleSubmit}
              endIcon={<Icon>send</Icon>}>Submit</Button>,

              <Button
                label="Cancel"
                primary="true"
                variant="contained"
                color="secondary"
                onClick={this.handleClose}
                endIcon={<Icon>send</Icon>}>Cancel</Button>,
          </form>
        </Dialog>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
  return {actions: bindActionCreators(actions, dispatch)}
}
const componentCreator = connect(null, mapDispatchToProps);
export default componentCreator(AddChoreForm);
