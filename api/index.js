const express = require('express');

const login = require('./login');
const app = express();
const home = require('./home');

app.use(express.json());
app.use(home);
app.use(login);

app.listen(3001, () => console.log('ouvindo porta 3001!'));
