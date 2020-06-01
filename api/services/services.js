const fs = require('fs').promises;

const path = require('path');

const fileName = 'currencies.json';

const { getToken } = require('../login');

const coinsDescription = {
  BRL: 'Brazilian Real',
  EUR: 'Euro',
  CAD: 'Canadian Dollar',
};

const verifyCurrency = (currency) => Object.keys(coinsDescription).find(element => element === currency);

const verifyValue = (value) => {
  if (value > 0 && value % 1 === 0)
    return true;
};

const readLocalCurrencies = async () => {
  try {
    const content = await fs.readFile(path.resolve(__dirname, '..', fileName));
    return JSON.parse(content.toString('utf-8'));
  } catch (err) {
    console.error(`Não foi possível ler o arquivo ${fileName}\nErro: ${err}`);
  }
};

const isTokenValid = (token = '') => getToken.find(provisionalToken => provisionalToken === token);

function authorizationMiddleware(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !isTokenValid(authorization))
    return res.status(401).json({ message: 'Token Inválido' });

  next();
}

module.exports = {
  authorizationMiddleware,
  coinsDescription,
  readLocalCurrencies,
  verifyCurrency,
  verifyValue,
};
