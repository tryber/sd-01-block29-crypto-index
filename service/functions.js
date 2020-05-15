const path = require('path');

const fs = require('fs').promises;

const { isTokenValid } = require('../api/token');

const validEmailOrPass = (validator, regex) => {
  if (!validator) return false;
  return regex.test(validator);
};

const parseF = (value, length) => Number(parseFloat(value).toFixed(length));

const creatorObject = (code, rate, description) => {
  const floatRate = parseF(rate, 4);
  const floatRateString = rate.toLocaleString('en-US', {
    maximumSignificantDigits: 9,
  });
  return {
    code,
    symbol: '&#36;',
    rate: floatRateString,
    description,
    rate_float: floatRate,
  };
};

const validatorRequestBtc = ({ currency, value }) => {
  const currencyVerificator = [currency].includes('BRL', 'EUR', 'CAD');
  const valueVerificator = value >= 0 && Number.isInteger(value);

  if (!currencyVerificator)
    return {
      status: 400,
      message: 'Moeda inválida',
    };

  if (!valueVerificator)
    return {
      status: 400,
      message: 'Valor inválido',
    };

  return {
    status: 200,
    message: 'Valor alterado com sucesso!',
  };
};

const fileModifier = async (fileModifierType, newContent) => {
  const filePath = path.resolve(__dirname, '..', 'currencies.json');

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

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;

  if (isTokenValid(authorization)) return next();
  return res.status(401).json({ message: 'Token inválido' });
};

module.exports = {
  validEmailOrPass,
  parseF,
  creatorObject,
  validatorRequestBtc,
  fileModifier,
  authorizationMiddleware,
};

// next.js
