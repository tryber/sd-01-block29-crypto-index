import express from 'express';
import fs from 'fs';
import path from 'path';

import React from 'react';
import ReactDOMServer from 'react-dom/server'; // permite fazer o ssr, renderizar do lado do servidor;

import App from '../src/App.js';

const app = express();

const reactApp = ReactDOMServer.renderToString(<App />); // renderizar a aplicação e transformar em uma string html;

app.use('^/$', (req, res, next) => { // quer bater no endpoint / usa regex para não correr o risco de bater com um endpoint que nao seja somente /;
  fs.readFile(
    path.resolve('./build/index.html'), 'utf-8', (err, data) => {
      if (err) {
        console.log(err);
        return res.status(500).send('Algo deu errado :(');
      }
      return res.send(
        data.replace('<div id="root"></div>', `<div id="root">${reactApp}</div>`) // substituir a div vazia, pela aplicação já renderizada;
      );
    }
  );
});

app.use(express.static(path.resolve(__dirname, '..', 'build')));

app.listen(3000, () => console.log('ouvindo porta 3000!'));
