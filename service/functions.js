const path = require('path');
const fs = require('fs').promises;

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
  const listVerificator = [currency];
  if (listVerificator.includes('BRL', 'EUR', 'CAD') && value >= 0) return true;
  return false;
};

const filePath = path.resolve(__dirname, '..', 'currencies.json');

const readFile = async () =>
  fs.readFile(filePath).then(fileContent => JSON.parse(fileContent));

const writeFile = async newContent =>
  fs.writeFile(filePath, JSON.stringify(newContent));

module.exports = {
  validEmailOrPass,
  generateToken,
  parseF,
  creatorObject,
  validatorRequestBtc,
  readFile,
  writeFile,
};
