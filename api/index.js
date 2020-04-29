const login = require('./login');
const home = require('./home');
const express = require('express');
const app = express();

app.use(home);
app.use(login);

app.listen(3001, () => console.log('ouvindo porta 3001!'));
