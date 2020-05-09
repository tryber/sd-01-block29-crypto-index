const express = require('express');
const axios = require('axios')

const router = express.Router();
const url = () =>
  `https://api.coindesk.com/v1/bpi/currentprice.json`;

const getSomeData = () => {
  return axios
    .get(`${url()}`)
    .then((currencies) => currencies.bpi)
    .catch((err) => console.error(err));
};


router.get('/cryto/btc', (req, res) => {
  const {USD, GBP, EUR} = await getSomeData()
  const currencies = {}
  res.send('estamos no btc!');
});

module.exports = router;

// perguntar ao Roz porque a api não retornar o bpi com os paises pedidos no projeto.
// perguntar o Roz porque o preço do BTC tão tão barato em reais no exemplo do projeto

const values = {
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
