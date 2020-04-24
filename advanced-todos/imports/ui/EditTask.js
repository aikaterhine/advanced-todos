import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Icon from '@material-ui/core/Icon';

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
    };
  }

  toggleEdition() {
    this.setState({
      edition: !this.state.edition,
    });
  }

  updateSituation(sitp, sita){
    return(

      <ButtonGroup variant="contained" color="primary" aria-label="contained primary button group">

        { sita == "Cadastrada" ?
          <Button
            variant="contained"
            color="primary"
            endIcon={<Icon>send</Icon>}
            disabled
          >
            Cadastrada
          </Button> : <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}> Cadastrada </Button>
        }

        { sita == "Em Andamento" ?
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              disabled
            >
              Em Andamento
            </Button> : <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}> Em andamento </Button>
        }

          { sita == "Concluída" ?
            <Button
              variant="contained"
              color="primary"
              endIcon={<Icon>send</Icon>}
              disabled
            >
              Concluída
            </Button> : <Button variant="contained" color="primary" endIcon={<Icon>send</Icon>}> Concluída </Button>
          }
      </ButtonGroup>
    );
  }

  editTask(){
    return(
      <List dense className={''}>
        <span className="text">
          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Nome"
              defaultValue="Digite para adicionar..."
              variant="outlined"
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Descrição"
              defaultValue="Digite para adicionar..."
              variant="outlined"
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
                id="outlined-helperText"
                label="Situação"
                defaultValue="Digite para adicionar..."
                variant="outlined"
                select
            >
              <MenuItem value="1">Cadastrada</MenuItem>
              <MenuItem value="2">Em Andamento</MenuItem>
              <MenuItem value="3">Concluída</MenuItem>
            </TextField>
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Data"
              defaultValue="Digite para adicionar..."
              variant="outlined"
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Usuário"
              defaultValue="Digite para adicionar..."
              variant="outlined"
            />
          </ListItem>
        </span>
      </List>
    );
  }

  renderTask(){

    const situacaopossivel = ["Cadastrada", "Em Andamento", "Concluída"];
    const situacaoatual = "Concluída"

    return(
      <List dense className={''}>
        <span className="text">
          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Nome"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Descrição"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Situação"
              defaultValue="cadastrada"
              variant="outlined"
              disabled
            />

            { this.updateSituation(situacaopossivel, situacaoatual) }

          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Data"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled
            />
          </ListItem>

          <ListItem key={''} text>
            <TextField
              id="outlined-helperText"
              label="Usuário"
              defaultValue="Digite para adicionar..."
              variant="outlined"
              disabled
            />
          </ListItem>
        </span>
      </List>
    );
  }

  render() {
    const { classes } = this.props;

    return (
      <div>
          <div className="container">
            <header>
                <div>
                  <Typography variant="h3" gutterBottom>
                    Todo List - Edit
                    <FormControlLabel className="edit-mode"
                      control={
                        <Switch
                          checked={this.state.edition}
                          onChange={this.toggleEdition.bind(this)}
                          name="checkedB"
                          color="primary"
                        />
                      }
                      label="Editar"
                    />
                  </Typography>
                </div>
            </header>

            { this.state.edition ? this.editTask() : this.renderTask() }
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(EditTask);
