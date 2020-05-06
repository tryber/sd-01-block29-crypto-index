const express = require('express');
const cors = require('cors');
const login = require('./login');
const crypto = require('./crypto');

const app = express();
app.use(cors());

function validToken(req) {
  if (!(req.headers.authorization && req.headers.authorization.length === 16)) return false;
  return true;
}

function authenticationMiddleware(req, res, next) {
  if (!validToken(req)) return res.status(500).json({ message: 'ERROR TOKEN' });
  next();
}

app.use('/login', login);

app.use(authenticationMiddleware);

app.use('/crypto', crypto);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint não encontrado',
  });
});

app.listen(3001, () => console.log('Foi'));
