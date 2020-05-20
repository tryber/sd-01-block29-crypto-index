const express = require('express');

const app = express();

const { routerLogin } = require('./login');
const crypto = require('./crypto');

app.use(express.json());

app.use('/login', routerLogin);
app.use('/crypto', crypto);

app.use('*', (_req, res) => {
  res.status(404).json({ message: "Endpoint não encontrado..." })
});

app.listen(3001, () => console.log('Ouvindo na porta 3001.'));
