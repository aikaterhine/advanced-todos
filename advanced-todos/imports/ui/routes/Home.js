import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

//import AccountsUIWrapper from './AccountsUIWrapper.js';

export default class Home extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return(
      <span ref="container">
      </span>
    );
  }
}
