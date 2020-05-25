const express = require('express');
const fs = require('fs').promises;
const path = require('path');

const currencyLogin = express.Router();

currencyLogin.get('/', async (_req, res) => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8');
    res.type('application/json').send(content);
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${'currencies.json'}\nErro: ${err}`);
    return res.json({ message: "Erro ao ler o arquivo" });
  }
});

module.exports = currencyLogin;
