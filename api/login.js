const express = require('express');

const router = express.Router();

const path = require('path');

const fs = require('fs').promises;

router.use(express.json());

const getTokens = async () => {
  const content = await fs.readFile(path.resolve(__dirname, 'data', 'tokens.json'));
  return JSON.parse(content.toString('utf-8'));
};

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/;
  return emailRegex.test(email);
};

function verifyPassword(password) {
  const pwdRegex = /^[0-9]{6}$/;
  return (password.match(pwdRegex) && password.length >= 6);
}

function gerarToken() {
  return `${Math.random().toString(36).slice(-10)}${Math.random().toString(36).slice(-6)}`;
}

const verifyData = ({ email, password }) => (
  !(verifyEmail(email) && verifyPassword(password))
);

router.post('/', async (req, res) => {
  const errors = verifyData(req.body);
  if (errors) return res.status(400).json({ message: 'Campos inválidos' });
  const dados = await getTokens();
  const token = gerarToken();
  dados.tokens.push(token);
  fs.writeFile(path.resolve(__dirname, 'data', 'tokens.json'), JSON.stringify(dados))
    .then(() => res.json({ token: `${token}` }));
});

module.exports = router;
