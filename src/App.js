import React from 'react';
import Main from './components/Main/Main.jsx';
import User from './components/User/User.jsx';
import Login from './components/Login/Login.jsx';
import { Route } from 'react-router-dom';
import './App.scss';

function App(props) {
  return (

  <div className="App">
    <Route path="/" exact component={Main} />
    <Route path="/user" exact component={User} />
    <Route path="/login" exact component={Login} />
  </div>
  );
}
export default App;
