const express = require('express');
const router = express.Router();
const fs = require('fs');
const fetch = require('node-fetch');
const getData = require('../client');
const currencies = require('./data/currencies.json');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

router.use(express.json());

router.post('/btc', async (req, res) => {
  if (verifyData(req.body)) {
    res.status(401).json({ message: 'Campos inválidos' });
  }
  const { currency, value } = req.body;
  const newObj = { ...currencies, [currency]: `${value}` }

  fs.writeFile(path.resolve(__dirname, 'data', 'currencies.json'), JSON.stringify(newObj), (err) => {
    if (err) throw err;
    res.json({
      "message": "Valor alterado com sucesso!"
    });
  });
})

router.get('/btc', async (req, res) => {
  const values = await getData(fetch);
  const { bpi: { USD } } = values;
  const dados = await getCurrencies();

  const result = Object.entries(dados).reduce((obj, dado) => {
    obj.bpi[dado[0]] = createObj(dado[0], dado[1], USD.rate_float);
    return obj;
  }, values);
  res.send(result);
})

const createObj = (code, value, dolar_rate_float) => {
  const rate_float = dolar_rate_float * value;
  const description = {
    "BRL": "Brazilian Real",
    "EUR": "Euro",
    "CAD": "Canadian Dollar"
  };

  return {
    code,
    rate: `${rate_float.toLocaleString('pt-BR')}`,
    description: description[code],
    rate_float,
  }
}

const getCurrencies = async () => {
  const content = await readFile(path.resolve(__dirname, 'data', 'currencies.json'));
  return JSON.parse(content.toString('utf-8'));
}

const verifyData = (currency, value) => (verifyCurrencies(currency) && verifyValue(value));

const verifyCurrencies = (currency) => ['BRL', 'EUR', 'CAD'].includes(currency);

const verifyValue = (value) => (Number.isInteger(value) && value !== 0);

module.exports = router;
