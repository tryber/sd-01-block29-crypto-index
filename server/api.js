const express = require('express');
const app = express();
const port = 3001;

function makeid(length) {
  var result = '';
  var characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

app.use(express.json());

app.post('/login', (req, res, next) => {
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  const passwordRegex = /^[0-9]{6}$/;

  if (req.body.email && req.body.password) {
    if (
      req.body.email.match(emailRegex) &&
      req.body.password.match(passwordRegex)
    ) {
      return res.send({ token: makeid(16) });
    }
  }

  return res.send({ message: 'Campos inválidos' }).status(400);
});

app.listen(port, () => console.log(`ouvindo ${port}`));
