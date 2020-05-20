const express = require('express');

const axios = require('axios');

const {
  parseF,
  creatorObject,
  validatorRequestBtc,
  fileModifier,
  authorizationMiddleware,
} = require('../../service/functions');

const router = express.Router();

const URL = (currency = 'currentprice.json') =>
  `https://api.coindesk.com/v1/bpi/${currency}`;

const getSomeData = () =>
  axios
    .get(URL())
    .then(({ data }) => data)
    .catch(err => console.error(err));

const bitcoin = {
  code: 'BTC',
  rate: '1.0000',
  description: 'Bitcoin',
  rate_float: 1,
};

const callBackrequestGet = async (__req, res) => {
  const data = await getSomeData();
  const read = await fileModifier('read');
  const { rate_float: rate } = data.bpi.USD;
  const { BRL: real, CAD: dolCad } = read;

  const BTCReais = rate * parseF(real, 2);
  const BTCDolCad = rate * parseF(dolCad, 2);

  const BRL = { BRL: creatorObject('BRL', BTCReais, 'Brazilian Real') };
  const CAD = { CAD: creatorObject('CAD', BTCDolCad, 'Canadian Dollar') };
  const BTC = { BTC: bitcoin };

  Object.assign(data.bpi, BRL);
  Object.assign(data.bpi, CAD);
  Object.assign(data.bpi, BTC);

  if (data) return res.status(200).send({ data });

  return res.status(400).send({ mensagem: 'Campos inválidos' });
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

router.post('/cryto/btc', callBackRequestPost);

router.get('/cryto/btc', callBackrequestGet);

module.exports = router;
