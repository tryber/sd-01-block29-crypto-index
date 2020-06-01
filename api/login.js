const express = require('express');

const routerLogin = express.Router();

const {
  generateToken,
  validLoginMiddleware,
} = require('./validLogin');

const getToken = [];

routerLogin.post('/', validLoginMiddleware, (_req, res) => {
  const token = generateToken();
  res.json({ token });
  getToken.push(token);
});

module.exports = { routerLogin, getToken };
