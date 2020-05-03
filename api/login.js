const express = require('express');
const router = express.Router();

router.use(express.json())

router.post('/', (req, res) => {
  const errors = verifyData(req.body);
  if (errors) {
    return res.status(401).json({ message: 'Campos inválidos' });
  }
  return res.json({ token: `${gerarToken()}` });
});

const verifyData = ({ email, password }) => (
  !(verifyEmail(email) && verifyPassword(password))
)

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return emailRegex.test(email);
}

function verifyPassword(password) {
  const pwdRegex = /([0-9]*)/g;
  return (pwdRegex.test(password) && password.length >= 6);
}

function gerarToken() {
  return `${Math.random().toString(36).slice(-10)}${Math.random().toString(36).slice(-6)}`;
}

module.exports = router;
