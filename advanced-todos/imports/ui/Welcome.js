import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import AccountsUIWrapperLogin from './AccountsUIWrapperLogin.js';
import AccountsUIWrapperLogout from './AccountsUIWrapperLogout.js';

import Login from '../components/Login.js';

import Logout from '../components/Logout.js';

import Register from '../components/Register.js';

const requireAuth = (nextState, replace) => {
  if (isLoggedOut()) {
    replace({
      pathname: '/login',
    });
  }
};

export const isLoggedIn = () => {
  return Boolean(Meteor.userId());
};
export const isLoggedOut = () => {
  return !Meteor.userId();
};

export default class Welcome extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return (
      <div className="container">
        <header>
          <div>
              <Typography variant="h4" gutterBottom>
                Seja Bem-Vindo!
              </Typography>
              <Typography variant="h6" gutterBottom>
                Você precisa logar para acessar as tarefas.
              </Typography>
          </div>
        </header>

        <div>
        {!isLoggedIn() ? <AccountsUIWrapperLogin /> : ""}
        </div>
      </div>

  );
  }
}
