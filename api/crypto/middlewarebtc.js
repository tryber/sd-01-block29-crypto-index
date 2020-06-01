const validateValue = value => Number.isInteger(value) && value > 0;

const validateCoins = currency => ['EUR', 'CAD', 'BRL'].includes(currency);

const validate = (req, res, next) => {
  const { currency, value } = req.body;
  if (!currency || !validateCoins(currency)) return res.status(400).json({ message: 'Moeda inválida' });
  if (!value || !validateValue(value)) return res.status(400).json({ message: 'Valor inválida' });
  next();
};

module.exports = validate;
