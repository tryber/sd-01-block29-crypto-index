import express from 'express';
import fs from 'fs';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../src/App.js';
const app = express();
const reactApp = renderToString(<App />);

const callBack = (err, data) => {
  if (err) {
    console.log(err);
    return res.status(500).send('Algo deu errado :(');
  }
  return res.send(
    data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`)
  );
}
app.use('^/$', (_req, res, _next) => {
  fs.readFile(
    path.resolve('./build/index.html'), 'utf-8',callBack
  );
});
app.use(express.static(path.resolve(__dirname, '..', 'build')));
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`ouvindo a porta ${PORT}!`));
