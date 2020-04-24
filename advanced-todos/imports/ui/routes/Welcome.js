import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Template } from 'meteor/templating';
import { Blaze } from 'meteor/blaze';

import Button from '@material-ui/core/Button';

export default class Welcome extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <span ref="container">
          <div className="Home">
            <div className="lander">
              <h1>Home page</h1>
              <p>A simple app showing react button click navigation</p>
              <form>
                <Button variant="btn btn-success" onClick={() => history.push('/Products')}>Click button to view products</Button>
              </form>
            </div>
          </div>
    </span>
  );
  }
}
