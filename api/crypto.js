const express = require('express');
const router = express.Router();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const fileName = 'currencies.json';

const test = async () => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, fileName))
    return console.log(JSON.parse(content.toString('utf-8')));
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\nErro: ${err}`);
    process.exit(1);
  }
}

test();

const url = 'https://api.coindesk.com/v1/bpi/currentprice/BTC.json';

router.get('/cryto/btc', (req, res) => {
  axios.get(url)
  .then(response => res.json(response.data))
  .catch(err => console.error(err))
});


module.exports = router;
