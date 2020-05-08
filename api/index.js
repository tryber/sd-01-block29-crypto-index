const express = require('express');

const app = express();

const routerCrypto = require('./routerCrypto');
const { routerLogin } = require('./routerLogin');

app.use(express.json());

app.use('/login', routerLogin);
app.use('/crypto/btc', routerCrypto);

app.use('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint não encontrado' });
});

app.listen(3001, () => {
  console.log('Ouvindo na porta 3001');
});
