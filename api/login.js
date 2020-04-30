const express = require('express');
const router = express.Router();
// const bcrypt = require('bcrypt');

// const saltRounds = 16

// const salt = bcrypt.genSaltSync(saltRounds)

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const regexPassword = /^[0-9]{6}$/;

const isEmailValid = (email, regex) => {
  if (!email) return false;
  return regex.test(email);
};

const isPasswordValid = (password, regex) => {
  if (!password) return false;
  return regex.test(password);
};

// const makeid = (length) => {
//   let result = '';
//   const characters =
//     'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//   const charactersLength = characters.length;
//   for (let i = 0; i < length; i += 1)
//     result += characters.charAt(Math.floor(Math.random() * charactersLength));
//   return result;
// }

// const hash = bcrypt.hashSync(testPass, salt);

router.post('/login', (req, res) => {
  // const { email, password } = req.boby;
  console.log('o email é => ', req.boby.email);
  if (
    isEmailValid(req.boby.email, regexEmail) &&
    isPasswordValid(req.boby.password, regexPassword)
  ) {
    return res.status(200).send( req.boby.email, req.boby.password );
  }

  return res.status(400).send({ mensagem: 'Campos inválidos' });
});

module.exports = router;

// router.post('/login', async (req, res) => {
//   try {
//     const { email, password } = req.boby;
//     if (isEmailValid(email, regexEmail) && isPasswordValid(password, regexPassword)) {
//       return res.status(200).send({email, password});
//     }
//   } catch (err) {
//     return res.status(400).send({ error: 'teste' });
//   }
// });
