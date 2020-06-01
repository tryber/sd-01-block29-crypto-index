const express = require('express');

const router = express.Router();
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const {
  authorizationMiddleware,
  coinsDescription,
  readLocalCurrencies,
  verifyCurrency,
  verifyValue,
} = require('./services/services');

const createObject = (readCurrenciasJson, data) => {
  const { bpi } = data;
  const index = Object.entries(readCurrenciasJson)
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

router.get('/btc', async (_req, res) => {
  const timeout = parseInt(process.env.COINBASE_API_TIMEOUT || 3000, 10);
  const { data, error } = await axios.get('https://api.coindesk.com/v1/bpi/currentprice/BTC.json', { timeout })
    .catch(err => ({ error: { data: err.response } }));
  if (error) return !error.data
    ? res.status(503).json({ message: 'coinbase service not available' })
    : res.status(500).json(error.data);
  const readCurrenciasJson = await readLocalCurrencies();
  const currenciesJson = createObject(readCurrenciasJson, data);
  res.json(currenciesJson);
});

router.use(authorizationMiddleware);

router.post('/btc', async (req, res) => {
  const { currency, value } = req.body;

  if (!verifyCurrency(currency)) return res.status(400).json({ message: 'Moeda Inválida' });
  if (!verifyValue(value)) return res.status(400).json({ message: 'Valor Inválido' });
  const getLocalCurrencies = await readLocalCurrencies();
  const obj = { ...getLocalCurrencies, [currency]: `${value}` };
  try {
    await fs.writeFile(path.resolve(__dirname, 'currencies.json'), JSON.stringify(obj));
    res.json({ message: 'Valor alterado com sucesso!' });
  } catch (err) {
    res.json({ message: 'Algo deu errado!', err });
  }
});

module.exports = router;
