import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import App from './App.js';
import Login from '../components/Login.js'
import Register from '../components/Register.js'

export default class AccountsUIWrapper extends Component {
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = ReactDOM.render(<Register />,
      ReactDOM.findDOMNode(this.refs.container));
  }
  componentWillUnmount() {
    // Clean up Blaze view
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.container));
  }
  render() {
    // Just render a placeholder container that will be filled in
    return (
      <span>
        <div ref="container">
        </div>
      </span>
    );
  }
}
