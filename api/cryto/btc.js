const express = require('express');

const axios = require('axios');

const {
  parseF,
  creatorObject,
  validatorRequestBtc,
  readFile,
  writeFile,
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

const callBackrequestGet = async (req, res) => {
  const data = await getSomeData();
  const read = await readFile();
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

  return res.status(400).send({ mensagem: 'Requisição falhou' });
};

const callBackRequestPost = async (req, res) => {
  const body = req.body;
  const { currency, value } = body;

  if (validatorRequestBtc(body)) {
    let read = await readFile();
    read[currency] = value;
    writeFile(read);

    return res.status(200).send({ message: 'Valor alterado com sucesso!' });
  }
  return res.status(500).send({ mensagem: 'Erro na Request' });
};

router.post('/cryto/btc', callBackRequestPost);

router.get('/cryto/btc', callBackrequestGet);

module.exports = router;
