const validEmail = { email: 'doug@gmail.com', password: '123456' };
const invalidEmail = { email: 'teste.teste.com', password: '123456' };
const success = {
  time: {
    updated: 'May 29, 2020 19:38:00 UTC',
    updatedISO: '2020-05-29T19:38:00+00:00',
    updateduk: 'May 29, 2020 at 20:38 BST',
  },
  disclaimer:
    'This data was produced from the CoinDesk Bitcoin Price Index (USD). Non-USD currency data converted using hourly conversion rate from openexchangerates.org',
  chartName: 'Bitcoin',
  bpi: {
    USD: {
      code: 'USD',
      symbol: '&#36;',
      rate: '9,405.0682',
      description: 'United States Dollar',
      rate_float: 9405.0682,
    },
    GBP: {
      code: 'GBP',
      symbol: '&pound;',
      rate: '7,613.7695',
      description: 'British Pound Sterling',
      rate_float: 7613.7695,
    },
    EUR: {
      code: 'EUR',
      symbol: '&euro;',
      rate: '8,458.1471',
      description: 'Euro',
      rate_float: 8458.1471,
    },
  },
};

const validData = {
  currency: 'BRL',
  value: 10000.0,
};

const invalidDataCurrency = {
  currency: 'BL',
  value: 10000.0,
};

const invalidDataValue = {
  currency: 'BRL',
  value: -10000,
};

module.exports = {
  validEmail,
  invalidEmail,
  success,
  validData,
  invalidDataCurrency,
  invalidDataValue,
};
