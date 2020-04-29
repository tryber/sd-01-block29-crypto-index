const express = require('express');
const app = express();
const crypto = require('crypto');

app.use(express.json());

function emailValid(email) {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function passwordValid(password) {
  const regex = /^\d+$/;
  return password.match(regex) && password.length === 6;
}

function generateToken() {
  return 'token';
}

function uservalidMiddleware(req, res, next) {
  if (!emailValid(req.body.email) || !passwordValid(req.body.password)) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  next();
}

const uservalida = {
  "email": "trybe@gmail.com",
  "password": "123456"
}

app.post('/login', uservalidMiddleware, (req, res) => {
  res.json({token: generateToken()});
});

app.listen(3001, () => {
  console.log('Ouvindo na porta 3001');
});
