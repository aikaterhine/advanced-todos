import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import App from './App.js';
import Login from '../components/Login.js'
import Logout from '../components/Logout.js'
import Register from '../components/Register.js'

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';


export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class AccountsUIWrapperRegister extends Component {

  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    //
    this.view = ReactDOM.render(<Logout />,
      ReactDOM.findDOMNode(this.refs.container));

  /*this.view = Blaze.render(Template.loginButtons,
    ReactDOM.findDOMNode(this.refs.container));*/

  }
  componentWillUnmount() {
    // Clean up Blaze view
    ReactDOM.unmountComponentAtNode(ReactDOM.findDOMNode(this.refs.container));
    //Blaze.remove(this.view);
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
