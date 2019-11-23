import React, { useState } from "react";
import { Button, FormGroup, FormControl, FormLabel, Navbar, NavDropdown, Nav, Form } from "react-bootstrap";
import "../styles/Login.scss";
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
      
      <Navbar bg="light" expand="lg">
          <Navbar.Brand href="#home">Vibraneur</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Form inline>
              <FormControl type="text" placeholder="Search" className="mr-sm-2" />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Navbar>
      
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