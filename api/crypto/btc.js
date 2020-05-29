const express = require('express');
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');
const validate = require('./middlewarebtc');

const router = express.Router();

const url = "https://api.coindesk.com/v1/bpi/currentprice/BTC.json";

const axiosFetch = (url) => axios.get(url).then(({ data }) => data );

const fileModifier = async (fileModifierType, newContent) => {
  const filePath = path.resolve(__dirname, '..', '..', 'currencies.json');
  const readFile = () =>
    fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));
  const writeFile = newContent =>
    fs.writeFile(filePath, JSON.stringify(newContent));
  const choices = {
    read: readFile,
    write: writeFile,
    default: 'Tipo de modificador errado',
  };
  return choices[fileModifierType](newContent) || choices.default;
};

const parseF = (value, length) => Number(parseFloat(value).toFixed(length));

const callbackGetBTC = async (req, res) => {
  const data = await axiosFetch(url).catch(err => err.response || err);
  const read = await fileModifier("read");
  if(!data.bpi) {
    console.log(data.data || data)
    return res.status(500).send({ message: "Error no data" });
  }
  const { rate_float } = data.bpi.USD;
  const { BRL, CAD, EUR } = read;
  const real = parseF(BRL, 2);
  const dolCad = parseF(CAD, 2);
  const euro = parseF(EUR, 2);
  const btcReais = rate_float * real;
  const btcDolCad = rate_float * dolCad;
  const btcEuro = rate_float * euro;
  const objReal = { BRL: {
    code: "BRL",
    rate: parseF(btcReais, 4).toString(),
    description: "Brazilian Real",
    rate_float: parseF(btcReais, 4),
  }}
  const objCad = { CAD: {
    code: "CAD",
    rate: parseF(btcDolCad, 4).toString(),
    description: "Canadian Dollar",
    rate_float: parseF(btcDolCad, 4),
  }}
  const objEur = { EUR: {
    code: "EUR",
    rate: parseF(btcEuro, 4).toString(),
    description: "Euro",
    rate_float: parseF(btcEuro, 4),
  }}
  Object.assign( data.bpi, objReal);
  Object.assign( data.bpi, objEur);
  Object.assign( data.bpi, objCad);
  if(data) return res.status(200).send( { data } );
  return res.status(400).send({ message: "Campos inválidos" });
} 

const callbackPostCoin = async (req, res) => {
  const { currency, value } = req.body;
  try{
    const sucess = {  message: "Valor alterado com sucesso!" };
    const read = await fileModifier("read");
    read[currency] = value
    const write = await fileModifier("write", read);
    console.log("read", read)
    console.log("write", write)
    return res.status(200).json(sucess);
  } catch(error){
    console.error()
  }
}

router.post('/crypto/btc', validate, callbackPostCoin );
router.get('/crypto/btc', callbackGetBTC );

module.exports = router;