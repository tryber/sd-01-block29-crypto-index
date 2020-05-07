const express = require('express');

const routerLogin = express.Router();

const {
  generateToken,
  userValidMiddleware,
} = require('./userValid');

const tokenGenerate = [];

routerLogin.post('/', userValidMiddleware, (req, res) => {
  const token = generateToken();
  res.json({ token });
  tokenGenerate.push(token);
});

module.exports = { routerLogin, tokenGenerate };
