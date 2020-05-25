const express = require('express');
const cors = require('cors');
const login = require('./login.js');
const btc = require('./crypto/btc');
const app = express();

app.use(cors());
app.use(express.json());

app.use(login);
app.use(btc);
app.use("*", (req, res) => {
  return res.status(404).send({message: "Endpoint não encontrado"});
})

const port = process.env.PORT || 3001;

app.listen(port, () => {
  console.log('listening on port 3001!');
});
