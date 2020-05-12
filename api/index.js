const express = require('express');

const app = express();

const login = require('./login');
const crypto = require('./crypto');

app.use(express.json());

app.use(login);
app.use(crypto);

app.listen(3001, () => console.log('Ouvindo na porta 3001.'));
