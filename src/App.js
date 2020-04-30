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


function App(props) {
  const { location } = props;
  return (
    <StaticRouter location={location}>
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        {/* <Route exact path="/update">
          <Update />
        </Route> */}
        <Route exact path="/">
          <Login />
        </Route>
      </Switch>
    </StaticRouter>
  );
}

export default App;
