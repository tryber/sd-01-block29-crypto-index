const express = require('express');
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const path = require('path');

const app = express();
app.use(express.json());

const readFile = util.promisify(fs.readFile);

async function getCurrencies() {
  return await readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8');
}

// app.get('/crypto/btc', (req, res) => {
//   axios.get('http://api.coindesk.com/v1/bpi/currentprice/BTC.json')
//     .then((response) => {
//       const bitcoin = (response.data)

//       res.json(getCurrencies());
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// function obj(rate, rate_float) {
//   [{
//     BRL: {
//       "code": "BRL",
//       "rate": rate * 'function',
//       "description": "Brazilian Real",
//       "rate_float": rate_float * 'function'
//     },
//     EUR: {
//       "code": "EUR",
//       "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
//       "description": "Euro",
//       "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
//     },
//     CAD: {
//       "code": "CAD",
//       "rate": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk",
//       "description": "Canadian Dollar",
//       "rate_float": "#Valor calculado a partir do arquivo currencies.json e API CoinDesk"
//     },
//   }]
// };

app.listen(3002, () => {
  console.log();
});
