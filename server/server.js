const express = require('express');
const fs = require('fs');
const path = require('path');

import React from 'react';
import ReactDOMServer from 'react-dom/server';

import Login from '../src/Login.js';

const app = express();

const reactApp = ReactDOMServer.renderToString(<Login />);

app.use('^/login$', (req, res, next) => {
  fs.readFile(path.resolve('./build/index.html'), 'utf-8', (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send('Algo deu errado :(');
    }
    return res.send(
      data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
    );
  });
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(3000, () => console.log('ouvindo porta 3000!'));
