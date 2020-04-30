const express = require('express');
const app = express();

const {
  generateToken,
  userValidMiddleware,
} = require('./userValid');

app.use(express.json());

app.post('/login', userValidMiddleware, (req, res) => {
  res.json({token: generateToken()});
});

// const uservalida = {
//   "email": "trybe@gmail.com",
//   "password": "123456"
// }

app.listen(3001, () => {
  console.log('Ouvindo na porta 3001');
});
