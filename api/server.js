const express = require('express');

const cors = require('cors');

const login = require('./login');

const btc = require('./cryto/btc');

const app = express();

app.use(cors());
app.use(express.json());
app.use(login);
app.use(btc);

app.use('*', (_req, res) =>
  res.status(404).send({
    message: 'Endpoint não encontrado',
  }),
);

app.use((error, _req, res, _next) =>
  res.status(500).json({ message: error.message }),
);

module.exports = app;
