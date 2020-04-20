import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';
import Home from '../imports/ui/routes/Home.js';
import About from '../imports/ui/routes/About.js';
import AccountsUIWrapper from '../imports/ui/AccountsUIWrapper.js';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

Meteor.startup(() => {
  render(
    <BrowserRouter>
      <Switch>
        <Route path="/" exact={true} component={AccountsUIWrapper} />
        <Route path="/about" component={About} />
      </Switch>
    </BrowserRouter>
    , document.getElementById('render-target'));
});
