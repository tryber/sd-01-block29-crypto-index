import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Home from './Home';

// import Login from './Login';
// import CurrencyQuote from './CurrencyQuote';

ReactDOM.hydrate(
  <Home />,
  // <Login />,
  // <CurrencyQuote />,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
