const express = require('express');
const app = express();

const routerCrypto = require('./routerCrypto');
const {
  generateToken,
  userValidMiddleware,
} = require('./userValid');

app.use(express.json());

// function errorHandlerMiddleware(err, req, res, next) {
//   res.status(500).json({ error: err.message });
// }

app.post('/login', userValidMiddleware, (req, res) => {
  res.json({ token: generateToken() });
});

app.use('/crypto/btc', routerCrypto);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

// app.use(errorHandlerMiddleware);

app.listen(3001, () => {
  console.log('Ouvindo na porta 3001');
});
