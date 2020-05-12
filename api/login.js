const express = require('express');
const crypto = require('crypto');

const router = express.Router();

const isEmailValid = (email = '') => {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(String(email).toLowerCase());
};

const isPasswordValid = (password = '') => {
  const regex = /^\d+$/;
  return password.match(regex) && password.length >= 6;
};

const generateToken = () => crypto.randomBytes(8).toString('hex');

router.post('/login', (req, res) => {
  if (!isEmailValid(req.body.email) || !isPasswordValid(req.body.password)) {
    return res.status(400).send({ message: 'Campos inválidos' });
  }

  return res.json({ token: generateToken() });
});

module.exports = router;
