const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const port = 3001;

app.use(express.json());

const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

function generateToken() {
  return `${Math.random().toString(36).slice(-10)}${Math.random().toString(36).slice(-6)}`;
}

const tokens = [];

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email.match(emailRegex) && password.length === 6) {
    const token = generateToken();
    tokens.push(token);
    return res.json({ token });
  }
  return res.status(400).json({ message: 'Campos inválidos' });
});

app.get('/crypto/btc', async (req, res) => {
  if (!tokens.includes(req.headers.authorization))
    return res.status(401).json({ message: "Token inválido" });
  const response = await fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json');
  const data = await response.json();
  const { bpi: { USD: { rate_float: rateFloat } } } = data;
  const currencies = JSON.parse(await fs.readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8'));
  const currencyDescription = { BRL: 'Brazilian Real', EUR: 'Euro', CAD: 'Canadian Dollar' };
  const newBPI = Object.entries(currencies).reduce((acc, currency) => {
    const float = currency[1] * rateFloat;
    return { ...acc, [currency[0]]: { code: currency[0], rate: float.toLocaleString('pt-BR'), description: currencyDescription[currency[0]], rate_float: float } };
  }, data.bpi);

  data.bpi = newBPI;
  res.json(data);
});

app.post('/crypto/btc', async (req, res) => {
  if (!tokens.includes(req.headers.authorization))
    return res.status(401).json({ message: "Token inválido" });
  const { currency, value } = req.body;
  const currencyValidation = currency === 'BRL' || currency === 'EUR' || currency === 'CAD';
  const valueValidation = Number.isInteger(value) && value > 0;
  if (!currencyValidation)
    return res.status(400).json({ message: 'Moeda inválida' });
  if (!valueValidation)
    return res.status(400).json({ message: 'Valor inválido' });
  const currencies = JSON.parse(await fs.readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8'));
  currencies[currency] = `${value}`;
  await fs.writeFile(path.resolve(__dirname, 'currencies.json'), JSON.stringify(currencies, null, 2));
  return res.json({ message: 'Valor alterado com sucesso!' });
});

app.use((__req, res) => {
  return res.status(404).json({ message: "Endpoint não encontrado" });
})

app.listen(port, () => console.log(`ouvindo ${port}`));
