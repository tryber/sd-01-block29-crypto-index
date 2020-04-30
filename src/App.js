import React from 'react';
import {
  StaticRouter,
  Switch,
  Route,
} from "react-router-dom";
import Login from './pages/Login';
import Home from './pages/Home';
// import Update from './pages/Update';
import './App.css'


function App(location) {
  return (
      <StaticRouter location={location}>
        <Switch>
          <Route exact path="/login">
            <Login />
          </Route>
          {/* <Route exact path="/update">
          <Update />
        </Route> */}
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </StaticRouter>
  );
}

export default App;
