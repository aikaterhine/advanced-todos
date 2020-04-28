import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import App from '../imports/ui/App.js';
import Home from '../imports/ui/routes/Home.js';
import About from '../imports/ui/routes/About.js';
import AccountsUIWrapper from '../imports/ui/AccountsUIWrapper.js';
import EditTask from '../imports/ui/EditTask.js';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import {Provider} from 'react-redux'
import configureStore from '../imports/store/configure_store.js';

const store = configureStore();
console.log(store.getState());

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact={true} component={App} />
          <Route path="/edittask" component={EditTask} />
        </Switch>
      </BrowserRouter>
    </Provider>
    , document.getElementById('render-target'));
});
