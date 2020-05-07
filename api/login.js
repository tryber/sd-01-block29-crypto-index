const express = require('express');
const router = express.Router();
const crypto = require('crypto');

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexPassword = /^[0-9]{6}$/;

const isEmailValid = (email, regex) => {
  if (!email) return false;
  return regex.test(email);
};

const isPasswordValid = (password, regex) => {
  if (!password) return false;
  return regex.test(password);
};

const callBackrequest = (req, res) => {
  const token = crypto.randomBytes(8);
  const { email, password } = req.body;
  if (
    isEmailValid(email, regexEmail) &&
    isPasswordValid(password, regexPassword)
  )
    return res.status(200).send({ token });
  return res.status(400).send({ mensagem: 'Campos inválidos' });
};

router.post('/login', callBackrequest);

module.exports = router;
