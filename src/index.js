import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
const root = document.getElementById('root');
const AppDOM = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
if (root.hasChildNodes() === true) ReactDOM.hydrate(<AppDOM />, root);
else ReactDOM.render(<AppDOM />, root);

serviceWorker.unregister();
