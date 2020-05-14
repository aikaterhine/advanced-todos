import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class CustomForms extends Component {

  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container">
      <header>
        <h1> Sobre o sistema! </h1>

        <template name="register">
          <form>
              <input type="email" name="registerEmail"/>
              <input type="password" name="registerPassword"/>
              <input type="submit" value="Register"/>
          </form>
        </template>

        <template name="login">
          <form>
              <input type="email" name="loginEmail"/>
              <input type="password" name="loginPassword"/>
              <input type="submit" value="Login"/>
          </form>
        </template>        
      </header>
    </span>;
  }
}
