const express = require('express');

const { validEmailOrPass } = require('../service/functions');
const { generateToken } = require('./token');

const router = express.Router();

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexPassword = /^[0-9]{6}$/;

const callBackRequestLogin = (req, res) => {

  const token = generateToken(16);

  const { email, password } = req.body;

  if (
    validEmailOrPass(email, regexEmail) &&
    validEmailOrPass(password, regexPassword)
  )
    return res.status(200).send({ token });
  return res.status(400).send({ mensagem: 'Campos inválidos' });
};

router.post('/login', callBackRequestLogin);

module.exports = router;
