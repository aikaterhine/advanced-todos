import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

export default class About extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container">
      <header>
        <h1>To-do List: Seja bem-vindo! </h1>
      </header>
    </span>;
  }
}
