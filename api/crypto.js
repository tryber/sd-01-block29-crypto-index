const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const fileName = 'currencies.json';

const {
  readLocalCurrencies,
  coinsDescription,
  verifyCurrency,
  verifyValue
} = require('./services/services');

router.get('/crypto/btc', async (_req, res) => {
  const { data } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
  const readCurrenciasJson = await readLocalCurrencies();
  const currenciesJson = createObject(readCurrenciasJson, data);
  res.json(currenciesJson);
});

router.post('/crypto/btc', async (req, res) => {
  const { currency, value } = req.body;

  if (!verifyCurrency(currency)) return res.status(400).json({ message: 'Moeda Inválida!' });
  if (!verifyValue(value)) return res.status(400).json({ message: 'O número precisa ser inteiro!' })
  verifyValue(value);
  console.log(verifyValue(value));
  const getLocalCurrencies = await readLocalCurrencies();
  const obj = { ...getLocalCurrencies, [currency]: `${value}` }
  try {
    await fs.writeFile(path.resolve(__dirname, fileName), JSON.stringify(obj));
    res.json({ message: 'Valor alterado com sucesso!' });
  } catch (err) {
    res.json({ message: 'Algo deu errado!', err });
  }
});

const createObject = (readLocalCurrencies, data) => {
  const { bpi } = data;
  const index = Object.entries(readLocalCurrencies)
    .map(coin => (
      {
        [coin[0]]:
        {
          code: coin[0],
          rate: (data.bpi.USD.rate_float * coin[1]).toLocaleString('pt-BR'),
          description: coinsDescription[coin[0]],
          rate_float: (data.bpi.USD.rate_float * coin[1]),
        },
      }
    ))
    .reduce((acum, coin) => {
      bpi[Object.keys(coin)[0]] = Object.values(coin)[0];
      return acum;
    }, data);

  return index;
};

module.exports = router;
