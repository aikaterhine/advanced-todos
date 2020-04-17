import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import { withTracker } from 'meteor/react-meteor-data';

import { Tasks } from '../api/tasks.js';

import Task from './Task.js';

import AccountsUIWrapper from './AccountsUIWrapper.js';
import Welcome from './routes/Welcome.js';
import About from './routes/About.js';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

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
      <Router>
        <div className="container">

          <nav id="menu">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
            </ul>
          </nav>

          {/* A <Switch> looks through its children <Route>s and
                renders the first one that matches the current URL. */}

          <Switch>

            <Route path="/about">
              <About />
            </Route>

            <Route path="/">
              <Welcome />

              <div className="container">
                <header>
                  <h1>Todo List ({this.props.incompleteCount})</h1>

                  <label className="hide-completed">
                    <input
                      type="checkbox"
                      readOnly
                      checked={this.state.hideCompleted}
                      onClick={this.toggleHideCompleted.bind(this)}
                    />
                    Hide Completed Tasks
                  </label>

                  <AccountsUIWrapper />

                  { this.props.currentUser ?
                    <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
                      <input
                        type="text"
                        ref="textInput"
                        placeholder="Type to add new tasks"
                      />
                    </form> : ''
                  }

                </header>

                <ul>
                  {this.renderTasks()}
                </ul>
              </div>
            </Route>

          </Switch>
        </div>
      </Router>
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
