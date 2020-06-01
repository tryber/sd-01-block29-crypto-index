const express = require('express');
const cors = require('cors');

const app = express();

const { routerLogin } = require('./login');
const crypto = require('./crypto');
const currencyLogin = require('./currencies');

app.use(express.json());

app.use(cors());

app.use('/login', routerLogin);
app.use('/crypto', crypto);
app.use('/currencies', currencyLogin);

app.use('*', (_req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado.' });
});

module.exports = app;
