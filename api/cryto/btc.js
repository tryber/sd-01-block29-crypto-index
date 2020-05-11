const express = require('express');

const axios = require('axios');

const router = express.Router();

const fs = require('fs');

const fileName = 'currencies.json';
let read =''
 fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\n Erro: ${err}`);
    process.exit(1);
  }
  const json = JSON.parse(data);
  console.log('aqui tem alguma coisa', json);
  read = json;
});

// minha função Read não ta funfando

const URL = (currency = 'currentprice.json') =>
  `https://api.coindesk.com/v1/bpi/${currency}`;

const getSomeData = () =>
  axios
    .get(`${URL()}`)
    .then(({ data }) => data.bpi)
    .catch((err) => console.error(err));

// 1 BTC em dolares = 6,506.6717 dólares (campo rate_float de USD no resultado da API)

// 1 BTC em reais = 5,40 (rate_float de BRL) * 6,506.6717 (rate_float de USD) = 35,136.02718 reais.

router.get('/cryto/btc', async (req, res) => {
  const dataFetch = await getSomeData();
  const {BRL} =  read;
  console.log('BRL →→→', BRL);
  const { rate_float } = dataFetch.USD;
  const BTCReais = BRL * rate_float;
  return res.status(200).send({ BTCReais });
});

module.exports = router;

const value = {
  time: {
    updated: 'May 9, 2020 20:16:00 UTC',
    updatedISO: '2020-05-09T20:16:00+00:00',
    updateduk: 'May 9, 2020 at 21:16 BST',
  },
  disclaimer:
    'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  chartName: 'Bitcoin',
  bpi: {
    USD: {
      code: 'USD',
      symbol: '&#36;',
      rate: '9,780.8376',
      description: 'United States Dollar',
      rate_float: 9780.8376,
    },
    GBP: {
      code: 'GBP',
      symbol: '&pound;',
      rate: '7,883.9615',
      description: 'British Pound Sterling',
      rate_float: 7883.9615,
    },
    EUR: {
      code: 'EUR',
      symbol: '&euro;',
      rate: '8,915.5855',
      description: 'Euro',
      rate_float: 8915.5855,
    },
  },
};
