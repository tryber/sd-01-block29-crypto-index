const path = require('path');

const fs = require('fs').promises;

const { arraysToken } = require('../api/login');

const validEmailOrPass = (validator, regex) => {
  if (!validator) return false;
  return regex.test(validator);
};

const generateToken = length =>
  `${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}`;

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

const filePath = path.resolve(__dirname, '..', 'currencies.json');

const readFile = async () =>
  fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));

const writeFile = async newContent =>
  fs.writeFile(filePath, JSON.stringify(newContent));

const authorizationMiddleware = (req, res, next) => {
  const { authorization } = req.headers;
  console.log('authorization →→→', authorization);
  console.log('arraysToken →→♠', arraysToken);
  if (arraysToken.includes(authorization.toString())) return next();
  return res.status(401).json({ message: 'unauthorized' });
};

module.exports = {
  validEmailOrPass,
  generateToken,
  parseF,
  creatorObject,
  validatorRequestBtc,
  readFile,
  writeFile,
  authorizationMiddleware,
};
