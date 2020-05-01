const express = require('express');
const axios = require('axios');
const fs = require('fs');
const util = require('util');
const path = require('path');

const app = express();
app.use(express.json());

const readFile = util.promisify(fs.readFile);

async function getCurrencies() {
  const currenciesJson = await readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8');

  return currenciesJson;
}

const description = {
  EUR: 'Euro',
  BRL: 'Brazilian Real',
  CAD: 'Canadian Dollar',
};

function getValues(coins, valueAPI) {
  const newObject = Object.entries(coins)
    // cria-se um array com cada indice sendo um array formado por chave e valor de um objeto;
    .map((coin) => {
      return {
        [coin[0]]:
        {
          code: coin[0],
          rate: (valueAPI.bpi.USD.rate_float * coin[1]).toLocaleString('pt-BR'),
          description: description[coin[0]],
          rate_float: (valueAPI.bpi.USD.rate_float * coin[1]),
        },
      }
    }) // newObject retorna um array de objetos sem o reduce;
    .reduce((acum, coin) => {
      acum.bpi[Object.keys(coin)[0]] = Object.values(coin)[0];
      return acum;
    }, valueAPI);

  return newObject;
}

app.get('/crypto/btc', (req, res) => {
  axios.get('http://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then(async (response) => {
      const bitcoin = response.data;
      // retorna os valores da api;

      const fileCurrencies = await getCurrencies();
      // como a função getCurrencies() retorna uma promise o await é necessário para esperar o valor do 
      // return desta função, caso o contrário a constante não teria nenhum 
      // valor e seria passada para frente;

      res.json(getValues(JSON.parse(fileCurrencies), bitcoin));
    })
    .catch((err) => {
      console.log(err);
    });
});

app.listen(3002, () => {
  console.log('funcionando');
});
