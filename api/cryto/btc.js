const express = require('express');

const axios = require('axios');

const rescue = require('../rescue');

const {
  parseF,
  creatorObject,
  validatorRequestBtc,
  fileModifier,
  authorizationMiddleware,
} = require('../utils');

const router = express.Router();

const URL = (currency = 'currentprice.json') =>
  `https://api.coindesk.com/v1/bpi/${currency}`;

const getSomeData = () =>
  axios
    .get(URL(), { timeout: parseInt(process.env.COINBASE_API_TIMEOUT) })
    .then(({ data }) => data);

const bitcoin = {
  code: 'BTC',
  rate: '1.0000',
  description: 'Bitcoin',
  rate_float: 1,
};

const callBackrequestGet = async (__req, res, next) => {
  const apiData = await getSomeData().catch(error => ({
    hasError: true,
    response: error.response,
  }));

  if (apiData.hasError)
    return !apiData.response
      ? res.status(503).json({ message: 'coinbase service not available' })
      : next({ message: apiData.response.data });

  const read = await fileModifier('read');
  const { rate_float: rate } = apiData.bpi.USD;
  const { BRL: real, CAD: dolCad } = read;

  const BTCReais = rate * parseF(real, 2);
  const BTCDolCad = rate * parseF(dolCad, 2);

  const BRL = { BRL: creatorObject('BRL', BTCReais, 'Brazilian Real') };
  const CAD = { CAD: creatorObject('CAD', BTCDolCad, 'Canadian Dollar') };
  const BTC = { BTC: bitcoin };

  Object.assign(apiData.bpi, BRL);
  Object.assign(apiData.bpi, CAD);
  Object.assign(apiData.bpi, BTC);

  return res.status(200).send({ data: apiData });
};

const callBackRequestPost = async (req, res) => {
  const body = req.body;
  const { currency, value } = body;
  const { status, message } = validatorRequestBtc(body);
  if (status === 200) {
    const read = await fileModifier('read');
    read[currency] = value;
    fileModifier('write', read);
    return res.status(200).send({ message });
  }
  return res.status(400).send({ message });
};

router.use(authorizationMiddleware);

router.post('/crypto/btc', rescue(callBackRequestPost));

router.get('/crypto/btc', rescue(callBackrequestGet));

module.exports = router;
