import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel } from "react-bootstrap";
import "./styles/Login.scss";
import { Redirect } from 'react-router-dom';


export default class Login extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      redirect_user: false
    }

    this.setEmail = this.setEmail.bind(this);
    this.setPassword = this.setPassword.bind(this);
    this.login = this.login.bind(this);
  }

  setEmail(email) {
    this.setState({
      email: email
    })
  }

  setPassword(password) {
    this.setState({
      password: password
    })
  }
  
login(e) {
    e.preventDefault();
    alert('You are logged in');
    this.setState({
      redirect_user: true
    })
}


render() {
  let redirect = undefined;
  if (this.state.redirect_user) {
    redirect = <Redirect to='/user'></Redirect>
  }
  return (
    <div className="Login">
      <form >
        <FormGroup controlId="email" bsSize="large">
          <FormLabel>Email</FormLabel>
          <FormControl
            autoFocus
            type="email"
            value={this.state.email}
            onChange={e => this.setEmail(e.target.value)}
          />
        </FormGroup>
        <FormGroup controlId="password" bsSize="large">
          <FormLabel>Password</FormLabel>
          <FormControl
            value={this.state.password}
            onChange={e => this.setPassword(e.target.value)}
            type="password"
          />
        </FormGroup>
        <button block bsSize="large" type="submit" onClick = {this.login}>
          Login
        </button>
        {redirect}
      </form>
    </div>
  );
}
  
}