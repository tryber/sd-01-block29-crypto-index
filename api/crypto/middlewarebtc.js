const { tokens } = require('../login');

const validateValue = value => Number.isInteger(value) && value > 0;
const validateCoins = currency => ['EUR', 'CAD', 'BRL'].includes(currency);
const validateToken = token => tokens.includes(token);

const validate = (req, res, next) => {
  const { currency, value } = req.body;
  const token = req.headers.authorization;

  if (!currency || !validateCoins(currency))
    return res.status(400).json({ message: 'Moeda inválida' });
  if (!value || !validateValue(value))
    return res.status(400).json({ message: 'Valor inválido' });
  if (!validateToken(token))
    return res.status(401).json({ message: 'Token inválido' });
  next();
};

module.exports = validate;
