import 'date-fns';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

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

import AccountsUIWrapper from './AccountsUIWrapper.js';

import EditIcon from '@material-ui/icons/Edit';
import IconButton from '@material-ui/core/IconButton';

import { withTracker } from 'meteor/react-meteor-data';
import Task from './Task.js';
import { BrowserRouter as Router, Switch, Route, Link, withRouter } from 'react-router-dom'

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  button: {
    margin: theme.spacing(1),
  }
});

// Task component - represents a single todo item
class EditTask extends Component {

  constructor(props) {
    super(props);

    let id, name, description, stateT, date, ownerUsername, ownerId;

    let filteredTasks = this.props.tasks;

    filteredTasks.map((task) => {
      id = task._id;
      name = task.name;
      description = task.description;
      stateT = task.state;
      date = task.createdAt;
      ownerUsername = task.username;
      ownerId = task.owner;
    });

    this.state = {
      edition: false,
      id: id,
      name: name,
      description: description,
      stateT: stateT,
      date: date,
      ownerUsername: ownerUsername,
      ownerId: ownerId,
    };

    this.toggleState = this.toggleState.bind(this);
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

  handleStateT(event) {
    this.setState({
        stateT: event.target.value
      });
  }

  handleDate(event) {
    this.setState({
        date: event.target.value
      });
  }

  handleOwnerUsername(event) {
    this.setState({
        ownerUsername: event.target.value
      });
  }

  returntoTask(){
    return(
      <Router>
          <Route path="/" exact={true} render={<Task/>} />
      </Router>
    );
  }

  handleSubmit(event){

    event.preventDefault();

    Meteor.call('tasks.update', this.state.id, this.state.name, this.state.description, this.state.stateT, this.state.date);
    this.setState({name: "", description: "", stateT: "", date: "", ownerUsername: ""});
    returntoTask();
  }

  toggleState(event) {
    console.log(event.target);
    Meteor.call('tasks.updateState', this.state.id, "");
  }

  toggleEdition() {
    this.setState({
      edition: !this.state.edition,
    });
  }

  updateSituation(){

    const sita = this.state.stateT;
    let sitp = "";

    if(sita == "Cadastrada"){
      sitp = "Em Andamento";
    }
    else if(sita == "Em Andamento"){
      sitp = "Concluída";
    }
    else if(sita == "Concluída"){
      sitp = "Cadastrada";
    }

    return(
      <ListItem key="stateUpdate" text="true">
      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

        { sita === "Cadastrada" || sita === "Em Andamento" || sita === "Concluída" ?
          <Button
            label="Cadastrada"
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            onClick={this.toggleState.bind(this)}
          >
            Cadastrada
          </Button> : <Button label="Cadastrada" variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={this.toggleState.bind(this)}> Cadastrada </Button>
        }

        { sita == "Em Andamento" || sitp !== "Em Andamento"?
            <Button
              label="Em Andamento"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              disabled={!this.state.edition}
              onClick={this.toggleState.bind(this)}
            >
            Em Andamento
            </Button> : <Button label="Em Andamento" variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={this.toggleState.bind(this)}> Em Andamento </Button>
        }

          { sita == "Concluída" || sitp !== "Concluída"?
            <Button
              label="Concluída"
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              onClick={this.toggleState.bind(this)}
              disabled={!this.state.edition}
            >
            Concluída
            </Button> : <Button label="Concluída" variant="contained" color="primary" endIcon={<Icon>send</Icon>} onClick={this.toggleState()}> Concluída </Button>
          }
      </ButtonGroup>
      </ListItem>
    );
  }

  renderTask(){

    return(
    <form>
      <List dense className={''}>
        <span className="text">
          <ListItem key="name" text="true">

            <TextField
              id="outlined-helperText"
              label="Nome"
              value= {this.state.name}
              variant="outlined"
              disabled={!this.state.edition}
              onChange={this.handleName.bind(this)}
            />
          </ListItem>

          <ListItem key="description" text="true">
            <TextField
              id="outlined-helperText"
              label="Descrição"
              value={this.state.description}
              variant="outlined"
              disabled={!this.state.edition}
              onChange={this.handleDescription.bind(this)}
            />
          </ListItem>

          <ListItem key="state" text="true">
            <TextField
              id="outlined-helperText"
              label="Situação"
              value={this.state.stateT}
              variant="outlined"
              disabled={!this.state.edition}
              onChange={this.handleStateT.bind(this)}
              select={true}
            >
              <MenuItem value="Cadastrada">Cadastrada</MenuItem>
              <MenuItem value="Em Andamento">Em Andamento</MenuItem>
              <MenuItem value="Concluída">Concluída</MenuItem>
            </TextField>
          </ListItem>

          { !this.state.edition ? this.updateSituation() : '' }

          <ListItem key="data" text="true">
            <TextField
              id="outlined-helperText"
              label="Data"
              type="date"
              value={this.state.date}
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              onChange={this.handleDate.bind(this)}
              disabled={!this.state.edition}
            />
          </ListItem>

          <ListItem key="ownerUsername" text="true">
            <TextField
              id="outlined-helperText"
              label="Usuário: "
              value={this.state.ownerUsername}
              variant="outlined"
              onChange={this.handleOwnerUsername.bind(this)}
              disabled={true}
            />
          </ListItem>

          <ListItem key="submit" text="true">
            <Button
              label="Submit"
              primary="true"
              variant="contained"
              color="primary"
              type='submit'
              onClick={this.handleSubmit.bind(this)}
              endIcon={<Icon>send</Icon>}
              disabled={!this.state.edition}>
              Submit </Button>

          </ListItem>

        </span>
      </List>
    </form>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
        <AccountsUIWrapper />

          <div className="container">
            <header>
                <div>
                  <Typography variant="h3" gutterBottom>
                      Todo List: Task Edit
                    <FormControlLabel className="edit-mode"
                      control={
                        <IconButton aria-label="edit" checked={this.state.edition} onClick={this.toggleEdition.bind(this)}>
                          <EditIcon/>
                        </IconButton>
                      }
                    />
                  </Typography>
                </div>
            </header>


            {this.renderTask()}
        </div>
      </div>
    );
  }
}
export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({ modeedition: {$ne: false} }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(EditTask);
