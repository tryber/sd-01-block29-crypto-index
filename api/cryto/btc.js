const express = require('express');

const axios = require('axios');

const router = express.Router();

const fs = require('fs');

const fileName = 'currencies.json';

const formatNumber = require('../../service/converter')

let read = '';

fs.readFile(fileName, 'utf8', (err, data) => {
  if (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\n Erro: ${err}`);
    process.exit(1);
  }
  const json = JSON.parse(data);
  read = json;
});

const URL = (currency = 'currentprice.json') =>
  `https://api.coindesk.com/v1/bpi/${currency}`;

const getSomeData = () =>
  axios
    .get(`${URL()}`)
    .then(({ data }) => data)
    .catch((err) => console.error(err));

const creatorObject = (code, rate, description) => {
  const floatRate = parseF(rate, 4);
  const floatRateString = formatNumber(rate);
  return {
    code,
    symbol: '&#36;',
    rate: floatRateString,
    description,
    rate_float: floatRate,
  };
};

const parseF = (value, length) => Number(parseFloat(value).toFixed(length));

const callBackrequest = async (req, res) => {
  let data = await getSomeData();

  const { rate_float: rate } = data.bpi.USD;
  const { BRL: real, CAD: dolCad } = read;

  const BTCReais = rate * parseF(real, 2);
  const BTCDolCad = rate * parseF(dolCad, 2);

  const BRL = { BRL: creatorObject('BRL', BTCReais, 'Brazilian Real') };
  const CAD = { CAD: creatorObject('CAD', BTCDolCad, 'Canadian Dollar') };

  Object.assign(data.bpi, BRL);
  Object.assign(data.bpi, CAD);

  if (data) {
    return res.status(200).send({ data });
  }
  return res.status(400).send({ mensagem: 'Requisição falhou' });
}

router.get('/cryto/btc', callBackrequest);

module.exports = router;
