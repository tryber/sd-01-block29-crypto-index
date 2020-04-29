const express = require('express');
const { validateLogin } = require('./login.js');
const { generateCurrencies, updateCurrencies } = require('./crypto.js');

const app = express();
const port = 3001;
const validate = [];

app.use(express.json());

app.post('/login', (req, res) => {
  validate.push(validateLogin(req));
  if (validate[validate.length - 1])
    return res.send(validate[validate.length - 1]);
  return res.send({ message: 'Campos inválidos' }).status(400);
});

app.get('/crypto/btc', async (req, res) => {
  res.send(await generateCurrencies());
});

app.post('/crypto/btc', async (req, res) => {
  const result = await updateCurrencies(req, validate);
  if (result !== 'Valor alterado com sucerro!')
    return res.send({ message: result }).status(400);

  return res.send({ message: result });
});

app.use((res) => {
  res.send({ message: 'Endpoint não encontrado' }).status(404);
});

app.listen(port, () => console.log(`ouvindo ${port}`));
