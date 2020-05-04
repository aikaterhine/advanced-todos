import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import AddChoreForm from '../components/AddChoreForm.js'
import ResponsiveDrawer from '../components/ResponsiveDrawer.js'
import Welcome from './routes/Welcome.js';

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  updateUser(){
    Meteor.call('users.update', Meteor.userId);
    console.log(this.props.currentUser);
  }

  toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  renderTasks() {
    let filteredTasks = this.props.tasks;
    if (this.state.hideCompleted) {
      filteredTasks = filteredTasks.filter(task => !task.checked);
    }
    return filteredTasks.map((task) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = task.owner === currentUserId;

      return (<Task key={task._id} task={task} currentUser={this.props.currentUser} showPrivateButton={showPrivateButton}/>);
    });
  }

  render() {

    return (
      <div>
      { this.props.currentUser ?
          <div className="container">
            <header>
                <div>
                  <Typography variant="h3" gutterBottom>
                    Todo List ({this.props.incompleteCount})
                  </Typography>

                    <FormControlLabel className="hide-completed"
                            control={
                              <Switch
                                checked={this.state.hideCompleted}
                                onChange={this.toggleHideCompleted.bind(this)}
                                name="checkedB"
                                color="primary"
                              />
                            }
                            label="Ocultar tarefas completadas"
                          />

                          <FormControlLabel className="hide-completed"
                                  control={
                                    <Switch
                                      checked={this.state.hideCompleted}
                                      onChange={this.updateUser.bind(this)}
                                      name="checkedB"
                                      color="primary"
                                    />
                                  }
                                  label="Mudar usuario"
                                />

                </div>
                  <AddChoreForm />
            </header>

            {this.renderTasks()}
        </div> : <div> <Welcome /> </div>
      }
      </div>
    );
  }
}

export default withTracker(() => {

  Meteor.subscribe('tasks');

  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
