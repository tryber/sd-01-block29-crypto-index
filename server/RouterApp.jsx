import React from 'react';
import { StaticRouter } from 'react-router-dom';
import App from '../src/App.js';

export default (req, context) => (
  <StaticRouter location={req.path} context={context}>
    <App />
  </StaticRouter>
);
