import React, { Component, useState, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Router, Route, Link, withRouter } from "react-router-dom";
import { createBrowserHistory } from "history";

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';

import { withTracker } from 'meteor/react-meteor-data';
import App from './App.js';
import EditTask from './EditTask.js';

import Welcome from './Welcome.js';

import { Tasks } from '../api/tasks.js';

import List from '@material-ui/core/List';

import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';

export const history = createBrowserHistory();

const styles = theme => ({
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

  constructor(props) {
    super(props);
  };

  openTasks = () => {
    <Route path="/tasks" component={App} />
    this.props.history.push('/tasks');
  }
    // Just render a placeholder container that will be filled in
  render() {
    const { classes } = this.props;

    return(
      <div className={classes.root}>
        <Router history={history}>
          <div className="container">
            <header>
              <div>
                <Card className="card1" variant="outlined" allign="true">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Cadastradas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.registeredState }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card2" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas em Andamento
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.inprogressState }
                    </Typography>
                    </CardContent>
                </Card>

                <Card className="card3" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Tarefas Concluídas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.completedState }
                    </Typography>
                  </CardContent>
                </Card>

                <Card className="card4" variant="outlined">
                  <CardContent>
                    <Typography className="" color="textSecondary" gutterBottom>
                      Lista de Tarefas
                    </Typography>
                    <Typography variant="h5" component="h2">
                    { this.props.incompleteCount }
                    </Typography>
                    <CardActions>
                      <Button component={Link} to="/tasks" size="small" onClick={this.openTasks}>Acessar</Button>
                    </CardActions>
                  </CardContent>
                </Card>
              </div>
            </header>
          </div>

          <main className={classes.content}>
            <Route path="/tasks" component={App} />
            <Route path="/edittasks" component={EditTask} />
          </main>
        </Router>
      </div>
    );
  }
}
export default withTracker(() => {

  Meteor.subscribe('tasks', "");

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    registeredState: Tasks.find({ state: "Cadastrada" }).count(),
    inprogressState: Tasks.find({ state: "Em Andamento" }).count(),
    completedState: Tasks.find({ state: "Concluída" }).count(),
    currentUser: Meteor.user(),
  };
})(withStyles(styles)(withRouter(DashBoard)));
