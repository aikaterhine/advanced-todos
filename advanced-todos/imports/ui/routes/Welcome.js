import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

export default class Welcome extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className="container">
        <header>
          <div>
              <Typography variant="h3" gutterBottom>
                Seja Bem-Vindo!
              </Typography>
          </div>
        </header>
      </div>

  );
  }
}
