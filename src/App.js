import React from 'react';
import {
  Switch,
  Route,
} from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Update from './pages/Update';
import './App.css'

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/login">
        <Login />
      </Route>
      <Route exact path="/update">
        <Update />
      </Route>
    </Switch>
  );
}

export default App;
