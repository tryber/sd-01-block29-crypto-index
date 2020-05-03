import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const root = document.getElementById('root')

const AppDOM = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
)

if (document.getElementById('root').hasChildNodes() === true) {
  ReactDOM.hydrate(
    <AppDOM />,
    root,
  );
}

if (!document.getElementById('root').hasChildNodes() === true) {
  ReactDOM.render(
    <AppDOM />,
    root,
  );
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
