import React from 'react';
import logo from './logo.svg';
import Main from './components/Main.jsx';
import User from './components/User.jsx';
import Login from './components/Login.jsx';
import { Route, Link } from 'react-router-dom';
import './App.scss';

function App(props) {
  return (

  <div className="App" backgroundImage="./static/background.png">
    <Route path="/" exact component={Main} />
    <Route path="/user" exact component={User} />
    <Route path="/login" exact component={Login} />
  </div>
  );
}
export default App;
