const express = require('express');

const axios = require('axios');
const fs = require('fs');
const util = require('util');
const path = require('path');

const router = express.Router();

const {
  authenticationMiddleware,
  currencyValidMiddleware,
  getCurrencies,
} = require('./currencyValid');

const writeFile = util.promisify(fs.writeFile);

async function newCurrencies(currency, value) {
  const currenciesFile = await getCurrencies();
  currenciesFile[currency] = value;

  const currenciesJson = await writeFile(path.resolve(__dirname, 'currencies.json'),
    JSON.stringify(currenciesFile));
  return currenciesJson;
}

router.use(authenticationMiddleware);

router.post('/', currencyValidMiddleware, async (req, res) => {
  const { currency, value } = req.body;

  await newCurrencies(currency, value);
  res.json({ message: 'Valor Alterado com sucesso' });
});

const description = {
  EUR: 'Euro',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
};

function getValues(coins, valueAPI) {
  const newObject = Object.entries(coins)
    .map((coin) => (
      {
        [coin[0]]:
        {
          code: coin[0],
          rate: (valueAPI.bpi.USD.rate_float * coin[1]).toLocaleString('pt-BR'),
          description: description[coin[0]],
          rate_float: (valueAPI.bpi.USD.rate_float * coin[1]),
        },
      }
    ))
    .reduce((acum, coin) => {
      valueAPI.bpi[Object.keys(coin)[0]] = Object.values(coin)[0];
      return acum;
    }, valueAPI);

  return newObject;
}

router.get('/', (req, res) => {
  axios.get('http://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then(async (response) => {
      const bitcoin = response.data;

      const fileCurrencies = await getCurrencies();

      res.json(getValues(fileCurrencies, bitcoin));
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
