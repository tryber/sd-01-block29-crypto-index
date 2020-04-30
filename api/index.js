const express = require('express');
const app = express();
const cors = require('cors');
const login = require('./login');
const crypto = require('./crypto');

app.use(cors());

app.use('/login', login);

app.use(authenticationMiddleware);

app.use('/crypto', crypto);

function authenticationMiddleware(req, res, next) {
  console.log('verificando',req.headers.authorization)
  if (!validToken(req)) {
    return res.status(500)
      .json({ message: 'ERROR TOKEN' });
  }
  next();
}

function validToken(req) {
  if (!(req.headers.authorization && req.headers.authorization.length === 16)) {
    return false;
  }
  return true;
}

app.use((req, res) => {
  res.status(404).json({
    "message": "Endpoint não encontrado",
  });
})

app.listen(3005, () => console.log('Foi'));
