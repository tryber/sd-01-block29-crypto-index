const express = require('express');

const login = require('./login');

const home = require('./home');

const btc = require('./cryto/btc');

const app = express();

app.use(express.json());
app.use(home);
app.use(login);
app.use(btc);

app.listen(3001, () => console.log('ouvindo porta 3001!'));
