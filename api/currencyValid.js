const fs = require('fs');
const util = require('util');
const path = require('path');

const { tokenGenerate } = require('./routerLogin');

const readFile = util.promisify(fs.readFile);

async function getCurrencies() {
  const currenciesJson = await readFile(path.resolve(__dirname, 'currencies.json'), 'utf-8');

  return JSON.parse(currenciesJson);
}

async function currencyValidMiddleware(req, res, next) {
  const { currency, value } = req.body;

  const currencyValid = Object.keys(await getCurrencies());

  const coin = currencyValid.find(valid => valid === currency);

  if (!coin) return res.status(400).json({ message: 'Moeda Inválida' });

  if (!value || value < 0 || !Number.isInteger(value))
    return res.status(400).json({ message: 'Valor inválido' });

  next();
}

function isTokenValid(token = '') {
  return tokenGenerate.find(toke => toke === token);
}

function authenticationMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !isTokenValid(authorization))
    return res.status(401).json({ message: 'Token inválido' });

  next();
}

module.exports = { currencyValidMiddleware, authenticationMiddleware, getCurrencies };
