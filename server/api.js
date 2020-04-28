const express = require('express');
const app = express();
const login = require('./login');

function authenticationMiddleware(req, res, next) {
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

app.use(authenticationMiddleware);

app.listen(3005, () => console.log('Foi'));
