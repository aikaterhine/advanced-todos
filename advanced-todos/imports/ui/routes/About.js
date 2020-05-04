import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class About extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container">
      <header>
        <h1> Sobre o sistema! </h1>
      </header>
    </span>;
  }
}
