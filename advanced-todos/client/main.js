import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';
import CssBaseline from '@material-ui/core/CssBaseline';
import { render } from 'react-dom';

import '../imports/startup/accounts-config.js';
import ResponsiveDrawer from '../imports/components/ResponsiveDrawer.js';
import AppBarInteraction from '../imports/components/AppBarInteraction.js';
import CustomForms from '../imports/components/CustomForms.js';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom'

import {Provider} from 'react-redux'
import configureStore from '../imports/store/configure_store.js';

const store = configureStore();
console.log(store.getState());

Meteor.startup(() => {
  render(
    <Provider store={store}>
      <React.Fragment>
        <CssBaseline />
        <AppBarInteraction />
      </React.Fragment>
    </Provider>
    , document.getElementById('render-target'));
});
