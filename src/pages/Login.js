import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Form from '../componentes/Form';

const sendUser = (email, password, setIsRedirect) => {
  axios.post('http://localhost:3005/login', {
    email,
    password,
  }).then(resp => {
    console.log(resp.status, resp.data.token)
    if (resp.status === 200) localStorage.setItem("token", resp.data.token);
    setIsRedirect(true)
  })
}

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g
  return emailRegex.test(email);
}

const verifyPassword = (password) => {
  const pwdRegex = /([0-9]*)/g;
  return (pwdRegex.test(password) && password.length >= 6);
}

const verifyData = (email, password) => {
  return (verifyEmail(email) && verifyPassword(password))
}

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);

  const objInputs = [
    {
      id: "inputEmail",
      label: "Email",
      type: "email",
      value: email,
      onChange: (value) => setEmail(value),
      valid: verifyEmail(email),
    },
    {
      id: "inputSenha",
      label: "Senha",
      type: "password",
      value: password,
      onChange: (value) => setPassword(value),
      valid: verifyPassword(password),
    },
    {
      id: "btnLogin",
      type: "button",
      value: "Entrar",
      onClick: () => sendUser(email, password, setIsRedirect),
      disable: !verifyData(email, password),
    },
  ];

  if (isRedirect && localStorage.getItem("token")) return <Redirect to="/" />

  return (
    <Form>
      {objInputs}
    </Form>
  );
};

export default Login;
