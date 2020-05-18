const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const fileName = 'currencies.json';

const readLocalCurrencies = async () => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, fileName))
    return JSON.parse(content.toString('utf-8'));
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\nErro: ${err}`);
    process.exit(1);
  }
}

const coinsDescription = {
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
}

router.get('/cryto/btc', async (req, res) => {
  const { data } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
  const readCurrenciasJson = await readLocalCurrencies();
  const currenciesJson = createObject(readCurrenciasJson, data);
  const allObject = Object.assign(data, currenciesJson)
  res.json(allObject);
});

const createObject = (readLocalCurrencies, data) => {
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
    return index;
};

module.exports = router;
