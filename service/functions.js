const validEmailOrPass = (validator, regex) => {
  if (!validator) return false;
  return regex.test(validator);
};

const generateToken = (length) =>
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

const validatorRequestBtc = async (currency, value) => {
  const listVerificator = [currency];
  const regex = /^[0-9]+$/;
  if (await listVerificator.includes('BRL', 'EUR', 'CAD') &&  await value.match(regex))
    return true;
  return false;
};

module.exports = {
  validEmailOrPass,
  generateToken,
  parseF,
  creatorObject,
  validatorRequestBtc,
};
