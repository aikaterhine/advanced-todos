import 'typeface-roboto';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import Welcome from './routes/Welcome.js';
import About from './routes/About.js';

import NavBar from '../components/NavBar.js';
import Button from '@material-ui/core/Button';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import Typography from '@material-ui/core/Typography';


// App component - represents the whole app
class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      hideCompleted: false,
    };
  }

  handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    Tasks.insert({
      text,
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

                  <form className="new-task">
                    <div>
                      <TextField
                        id="outlined-helperText"
                        label="Nova Tarefa"
                        defaultValue="Digite para adicionar..."
                        variant="outlined"
                      />
                    </div>
                  </form>

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
