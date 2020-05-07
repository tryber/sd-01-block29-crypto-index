const express = require('express');

const fs = require('fs');

const router = express.Router();

const getData = require('../client');

const currencies = require('./data/currencies.json');

const path = require('path');

const util = require('util');

const readFile = util.promisify(fs.readFile);

router.use(express.json());

const getContent = async (name) => {
  const content = await readFile(path.resolve(__dirname, 'data', name));
  return JSON.parse(content.toString('utf-8'));
};

const verifyCurrencies = currency => !['BRL', 'EUR', 'CAD'].includes(currency);
const verifyValue = value => Number.isInteger(value) && value > 0;

const createObj = (code, value, dolarRateFloat) => {
  const rateFloat = dolarRateFloat * value;
  const description = {
    BRL: 'Brazilian Real',
    EUR: 'Euro',
    CAD: 'Canadian Dollar',
  };

  return {
    code,
    rate: `${rateFloat.toLocaleString('pt-BR')}`,
    description: description[code],
    rate_float: rateFloat,
  };
};

router.post('/btc', async (req, res) => {
  const { currency, value } = req.body;
  if (verifyCurrencies(currency)) return res.status(400).json({ message: 'Moeda inválida' });
  if (!verifyValue(value)) return res.status(400).json({ message: 'Valor inválido' });
  const newObj = { ...currencies, [currency]: `${value}` };
  fs.writeFile(path.resolve(__dirname, 'data', 'currencies.json'), JSON.stringify(newObj), (err) => {
    if (err) throw err;
    return res.json({
      message: `Valor alterado com sucesso! ${currency} + ${value}`,
    });
  });
});

router.get('/btc', async (req, res) => {
  try {
    const values = await getData();
    const { bpi: { USD } } = values;
    const dados = await getContent('currencies.json');
    const result = Object.entries(dados).reduce((obj, dado) => {
      const arr = obj;
      arr.bpi[dado[0]] = createObj(dado[0], dado[1], USD.rate_float);
      return arr;
    }, values);
    return res.json(result);
  } catch (e) {
    return res.json({ error: e });
  }
});

module.exports = router;
