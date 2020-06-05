const express = require('express');
const cors = require('cors');
const login = require('./login');
const btc = require('./crypto/btc');

const app = express();

app.use(cors());
app.use(express.json());
app.use(login.router);
app.use(btc);
app.use('*', (_req, res) =>
  res.status(404).json({ message: 'Endpoint não encontrado' }),
);
app.use((error, _req, res, _next) => {
  res.status(500).json({ message: error.message, stack: error.stack });
});

module.exports = app;
