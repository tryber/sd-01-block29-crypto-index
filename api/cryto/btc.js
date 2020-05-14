const express = require('express');

const axios = require('axios');

const {
  parseF,
  creatorObject,
  validatorRequestBtc,
} = require('../../service/functions');

const router = express.Router();

const fs = require('fs');

const fileName = 'currencies.json';

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
    .get(URL())
    .then(({ data }) => data)
    .catch((err) => console.error(err));

const bitcoin = {
  code: 'BTC',
  rate: '1.0000',
  description: 'Bitcoin',
  rate_float: 1,
};

const callBackrequestGet = async (req, res) => {
  const data = await getSomeData();

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
  const fileNameWrite = '../../currencies.json';
  const { currency, value } = req.body;
  console.log('0 que tem aqui?', req.body);
  if (validatorRequestBtc(currency, value)) {
    fs.writeFile(fileNameWrite, req.body, (err) => {
      if (err) {
        throw err;
      }
      console.log('Arquivo salvo');
    });
    return res.status(200).send({ message: 'Valor alterado com sucesso!' });
  }
  return res.status(500).send({ mensagem: 'Erro na Request' });
};

router.post('/cryto/btc', callBackRequestPost);

router.get('/cryto/btc', callBackrequestGet);

module.exports = router;
