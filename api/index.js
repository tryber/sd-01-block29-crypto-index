const express = require('express');

const login = require('./login');

const home = require('./home');

const btc = require('./cryto/btc');

const app = express();

app.use(express.json());
app.use(home);
app.use(login);
app.use(btc);

app.use((req, res, next) =>
  res.status(404).send({
    message: 'Endpoint não encontrado',
  })
);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => console.log(`ouvindo na porta http://localhost${PORT}!`));
