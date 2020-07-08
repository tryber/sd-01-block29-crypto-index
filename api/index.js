const express = require('express');
const { validateLogin } = require('./login.js');
const { generateCurrencies, updateCurrencies } = require('./crypto.js');
const cors = require('cors');

const app = express();
const port = 3001;
const validate = [];

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  validate.push(validateLogin(req));
  if (validate[validate.length - 1])
    return res.send(validate[validate.length - 1]);
  return res.status(400).send({ message: 'Campos inválidos' });
});

app.get('/crypto/btc', async (req, res) => {
  res.send(await generateCurrencies());
});

app.post('/crypto/btc', async (req, res) => {
  const result = await updateCurrencies(req, validate);
  if (result !== 'Valor alterado com sucerro!')
    return res.status(400).send({ message: result });

  return res.send({ message: result });
});

app.use((res) => {
  res.status(404).send({ message: 'Endpoint não encontrado' });
});

app.listen(port, () => console.log(`ouvindo ${port}`));
