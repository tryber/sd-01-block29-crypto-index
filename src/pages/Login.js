import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Form from '../componentes/Form';

const sendUser = (email, password, callback) => (
  axios.post('https://localhost:3005/login', {
    email,
    password,
  }).then((resp) => {
    localStorage.setItem("token", resp.token);
    callback(true);
  })
)

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return emailRegex.test(email);
}

const verifyPassword = (password) => {
  const pwdRegex = /([0-9]*)/g;
  return (pwdRegex.test(password) && password.length >= 6);
}

const verifyData = (email, password) => {
  return verifyEmail(email) && verifyPassword(password)
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [shouldRedirect, setShouldRedirect] = useState(false);

  const objInputs = [
    {
      id: "inputEmail",
      label: "Email",
      type: "email",
      value: email,
      onChange: setEmail,
      valid: verifyEmail(email),
    },
    {
      id: "inputSenha",
      label: "Senha",
      type: "password",
      value: email,
      onChange: setPassword,
      valid: verifyPassword(password),
    },
    {
      id: "btnLogin",
      type: "button",
      value: "Entrar",
      onClick: () => sendUser(email, password, setShouldRedirect),
      disable: verifyData(email, password),
    },
  ];

  if (shouldRedirect) return <Redirect to="/" />

  return (
    <Form>
      {objInputs}
    </Form>
  );
};

export default Login;
