const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const util = require('util');
const readFile = util.promisify(fs.readFile);

const getCurrencies = async () => {
  const content = await readFile(
    path.resolve(__dirname, '..', 'server', 'currencies.json')
  );
  return JSON.parse(content.toString('utf-8'));
};

function fetchCoinDesk() {
  return fetch('https://api.coindesk.com/v1/bpi/currentprice/BTC.json')
    .then((res) => res.json())
    .then((result) => result);
}

const currencies = [
  ['BRL', 'Brazilian Real'],
  ['EUR', 'Euro'],
  ['CAD', 'Canadian Dollar'],
];

async function generateCurrencies() {
  const values = await getCurrencies();
  const api = await fetchCoinDesk();
  currencies.forEach((currency) => {
    api['bpi'][currency[0]] = {
      code: currency[0],
      rate: (api['bpi']['USD']['rate_float'] * values[currency[0]]).toString(),
      description: currency[1],
      rate_float: api['bpi']['USD']['rate_float'] * values[currency[0]],
    };
  });
  return api;
}

function validateData(req, validate) {
  if (!validateAuthorization(req, validate)) {
    return 'token inválido!';
  }
  if (!req.body.currency || !validateCurrency(req.body.currency)) {
    return 'Moeda inválida';
  }
  if (!req.body.value || !validateValue(req.body.value)) {
    return 'Valor inválido';
  }
  return 'Valor alterado com sucesso';
}

const validateCurrency = (value) => ['BRL', 'EUR', 'CAD'].includes(value);
const validateValue = (value) => Number.isInteger(value) && value > 0;
const validateAuthorization = (req, validate) =>
  validate[validate.length - 1] &&
  req.headers.authorization === validate[validate.length - 1].token;

async function updateCurrencies(req, validate) {
  if (validateData(req, validate) === 'Valor alterado com sucesso') {
    const values = await getCurrencies();
    values[req.body.currency] = req.body.value;

    fs.writeFile(
      path.resolve(__dirname, '..', 'server', 'currencies.json'),
      JSON.stringify(values),
      (err) => {
        if (err) throw err;
      }
    );
  }
  return validateData(req, validate);
}
module.exports = {
  generateCurrencies,
  updateCurrencies,
};
