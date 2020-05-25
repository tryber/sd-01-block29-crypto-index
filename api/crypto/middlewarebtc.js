const validateValue = (value) => {
  return Number.isInteger(value) && value > 0
}

const validateCoins = (currency) => {
  return ['EUR', 'CAD', 'BRL'].includes(currency);
}

const validate = (req, res, next) => {
  const { currency, value } = req.body;
  if(!currency || !validateCoins(currency)) return res.status(400).json({ message: "Moeda inválida" });
  if(!value || !validateValue(value)) return res.status(400).json({ message: "Valor inválida" });
  next();
}

module.exports = validate;