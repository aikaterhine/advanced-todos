import 'date-fns';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Tasks } from '../api/tasks.js';

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
import Switch from '@material-ui/core/Switch';

import { withTracker } from 'meteor/react-meteor-data';

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

    this.state = {
      edition: false,
      name: this.props.name,
    };
  }

  updateTask() {
    Meteor.call('tasks.update', "XADX65a7m8NgF4s6t", "Testando");
  }

  toggleState() {
    Meteor.call('tasks.updateState', this.props.task._id, state);
  }

  toggleEdition() {
    this.setState({
      edition: !this.state.edition,
    });
  }

  updateSituation(sitp, sita){
    return(

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

        { sita === "Cadastrada" || sita === "Em Andamento" || sita === "Concluída" ?
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
          >
            Cadastrada
          </Button> : ''
        }

        { sita == "Em Andamento" || sitp !== "Em Andamento"?
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              disabled={!this.state.edition}
            >
              Em Andamento
            </Button> : <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}> Em andamento </Button>
        }

          { sita == "Concluída" || sitp !== "Concluída"?
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              disabled={!this.state.edition}
            >
              Concluída
            </Button> : <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}> Concluída </Button>
          }
      </ButtonGroup>
    );
  }

  renderTask(){

    const situacaopossivel = "Em Andamento";
    const situacaoatual = "Cadastrada"

    return(
      <List dense className={''}>
        <span className="text">
          <ListItem key="name" text="true">
            <TextField
              id="outlined-helperText"
              label="Nome"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled={!this.state.edition}
            />
          </ListItem>

          <ListItem key="description" text="true">
            <TextField
              id="outlined-helperText"
              label="Descrição"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled={!this.state.edition}
            />
          </ListItem>

          <ListItem key="state" text="true">
            <TextField
              id="outlined-helperText"
              label="Situação"
              defaultValue="Cadastrada"
              variant="outlined"
              disabled={!this.state.edition}
              select={true}
            >
              <MenuItem value="1">Cadastrada</MenuItem>
              <MenuItem value="2">Em Andamento</MenuItem>
              <MenuItem value="3">Concluída</MenuItem>
            </TextField>

            { !this.state.edition ? this.updateSituation(situacaopossivel, situacaoatual) : '' }

          </ListItem>

          <ListItem key="data" text="true">
            <TextField
              id="outlined-helperText"
              label="Data"
              type="date"
              defaultValue="2017-05-24"
              variant="outlined"
              InputLabelProps={{
                shrink: true,
              }}
              disabled={!this.state.edition}
            />
          </ListItem>

          <ListItem key="owner" text="true">
            <TextField
              id="outlined-helperText"
              label="Usuário"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled={!this.state.edition}
            />
          </ListItem>
        </span>
      </List>
    );
  }

  render() {
    const { classes } = this.props;
    console.log(this.props.match.params);

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
                        <IconButton aria-label="edit" checked={this.state.edition} onClick={this.updateTask.bind(this)}>
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
export default withStyles(styles)(EditTask);
