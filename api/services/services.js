const fs = require('fs').promises;
const path = require('path');
const fileName = 'currencies.json';

const coinsDescription = {
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
}

const verifyCurrency = (currency) => {
  return Object.keys(coinsDescription).find(element => element === currency);
}

const verifyValue = (value) => {
  if (value > 0 && value % 1 === 0) {
    return true;
  }
}

const readLocalCurrencies = async () => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, '..', fileName))
    return JSON.parse(content.toString('utf-8'));
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\nErro: ${err}`);
  }
}

module.exports = {
  coinsDescription,
  readLocalCurrencies,
  verifyCurrency,
  verifyValue
}
