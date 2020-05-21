import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';
import { Link } from 'react-router-dom';

import ForgotPassword from '../components/ForgotPassword.js'

import IconButton from '@material-ui/core/IconButton';

import MenuIcon from '@material-ui/icons/Menu';

import Icon from '@material-ui/core/Icon';

import Button from '@material-ui/core/Button';

export default class AccountsUIWrapperLogin extends Component {

  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    //
    this.view = ReactDOM.render(<ForgotPassword />,
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
