import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import AccountsUIWrapper from './AccountsUIWrapper.js';

import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';

import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';

import AddChoreForm from '../components/AddChoreForm.js'

// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit2(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      name: text,
      description: '',
      state: "Cadastrada",
      createdAt: new Date(), // current time
      owner: Meteor.userId(),           // _id of logged in user
      username: Meteor.user().username,  // username of logged in user
    });

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
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
    return filteredTasks.map((task) => (
      <Task key={task._id} task={task} />
    ));
  }

  render() {

    return (
      <div>
      <AccountsUIWrapper />
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

                </div>
                  <AddChoreForm />
                <div>

                </div>
            </header>

            {this.renderTasks()}
        </div> : ''
      }
      </div>
    );
  }
}

export default withTracker(() => {
  return {
    tasks: Tasks.find({}, { sort: { createdAt: -1 } }).fetch(),
    incompleteCount: Tasks.find({ checked: { $ne: true } }).count(),
    currentUser: Meteor.user(),
  };
})(App);
