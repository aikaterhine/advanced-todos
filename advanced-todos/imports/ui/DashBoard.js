import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

class DashBoard extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className="container">
        <header>
          <div>
            <Card className="" variant="outlined" allign>
              <CardContent>
                <Typography className="" color="textSecondary" gutterBottom>
                  Tarefas Cadastradas
                </Typography>
                <Typography variant="h5" component="h2">
                { this.props.registeredState }
                </Typography>
              </CardContent>
            </Card>

            <Card className="" variant="outlined">
              <CardContent>
                <Typography className="" color="textSecondary" gutterBottom>
                  Tarefas em Andamento
                </Typography>
                <Typography variant="h5" component="h2">
                { this.props.inprogressState }
                </Typography>
                </CardContent>
            </Card>

            <Card className="" variant="outlined">
              <CardContent>
                <Typography className="" color="textSecondary" gutterBottom>
                  Tarefas Concluídas
                </Typography>
                <Typography variant="h5" component="h2">
                { this.props.completedState }
                </Typography>
              </CardContent>
            </Card>

            <Card className="" variant="outlined">
              <CardContent>
                <Typography className="" color="textSecondary" gutterBottom>
                  Lista de Tarefas
                </Typography>
                <Typography variant="h5" component="h2">
                { this.props.incompleteCount }
                </Typography>
                <CardActions>
                  <Button size="small">Acessar</Button>
                </CardActions>
              </CardContent>
            </Card>
          </div>
        </header>
      </div>

  );
  }
}
export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    registeredState: Tasks.find({ state: "Cadastrada" }).count(),
    inprogressState: Tasks.find({ state: "Em Andamento" }).count(),
    completedState: Tasks.find({ state: "Concluída" }).count(),
    currentUser: Meteor.user(),
  };
})(DashBoard);
