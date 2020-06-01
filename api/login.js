const express = require('express');
const router = express.Router();

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^[0-9]{6}$/;

const validate = ( params1, regex ) => {
  if(!params1) return false
  return regex.test(params1)
}

const generatorToken = (length) => {
  return `${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}${Math.random()
    .toString(36)
    .slice((length / 2) * -1)}`;
}

const callbackRequest = (req, res) => {
  const invalid = { message: "Campos inválidos" }
  const token = generatorToken(16);
  const { email, password } = req.body
  if(validate(email, regexEmail) && validate(password, regexPassword) ) {
    return res.status(200).send( { token } );
  }
  return res.status(400).send( invalid );
}

router.post('/login', callbackRequest );

module.exports = router;
