const crypto = require('crypto');

function emailValid(email = '') {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
};

function passwordValid(password = '') {
  const regex = /^\d+$/;
  return regex.test(password) && password.length === 6;
};

function generateToken() {
  return crypto.randomBytes(8).toString('hex');
};

function userValidMiddleware(req, res, next) {
  if (!emailValid(req.body.email) || !passwordValid(req.body.password)) {
    return res.status(400).json({ message: 'Campos inválidos' });
  }

  next();
};

module.exports = {
  generateToken,
  userValidMiddleware,
};

