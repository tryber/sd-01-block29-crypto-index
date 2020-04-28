import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

const raiz = document.getElementById('root');

const superFather = (page, toot) => {
  ReactDOM.hydrate(page, toot);
  return serviceWorker.unregister();
};

superFather(<App />, raiz);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
