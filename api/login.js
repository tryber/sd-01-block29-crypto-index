const express = require("express");
const rescue = require("./rescue");

const router = express.Router();

const regexEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const regexPassword = /^[0-9]{6}$/;

const validate = (params1, regex) => {
  if (!params1) return false;
  return regex.test(params1);
};

const generatorToken = () =>
  `${Math.random().toString(36).slice(-10)}${Math.random()
    .toString(36)
    .slice(-6)}`;

const tokens = [];

const callbackRequest = (req, res) => {
  const invalid = { message: "Campos inválidos" };
  const token = generatorToken();
  tokens.push(token);
  const { email, password } = req.body;
  if (validate(email, regexEmail) && validate(password, regexPassword))
    return res.status(200).json({ token });
  return res.status(400).json(invalid);
};

router.post("/login", rescue(callbackRequest));

module.exports = { router, tokens };
