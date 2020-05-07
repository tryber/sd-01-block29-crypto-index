const express = require('express');
const cors = require('cors');
const login = require('./login');
const crypto = require('./crypto');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(cors());

const getContent = async (name, value) => {
  const content = await fs.readFile(path.resolve(__dirname, 'data', name));
  const data = JSON.parse(content.toString('utf-8'));
  const isExist = data.tokens.find(token => token === value)
  return isExist;
};

function validToken(req) {
  return (req.headers.authorization &&
    req.headers.authorization.length === 16 &&
    getContent('tokens.json', req.headers.authorization)
  );
}

function authenticationMiddleware(req, res, next) {
  if (!validToken(req)) return res.status(401).json({ message: 'Token inválido' });
  next();
}

app.use('/login', login);

app.use(authenticationMiddleware);

app.use('/crypto', crypto);

app.use((req, res) => {
  res.status(404).json({
    message: 'Endpoint não encontrado',
  });
});

app.listen(3001, () => console.log('Foi'));
