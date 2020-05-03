import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import Form from '../componentes/Form';
import { setToken, getItemToken } from './localStorageApi';

const sendUser = (email, password, setIsRedirect) => {
  axios.post('http://localhost:3005/login', {
    email,
    password,
  }).then((resp) => {
    if (resp.status === 200) setToken(resp.data.token);
    setIsRedirect(true);
  });
};

const verifyEmail = (email) => {
  const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/g;
  return emailRegex.test(email);
};

const verifyPassword = (password) => {
  const pwdRegex = /([0-9]*)/g;
  return (pwdRegex.test(password) && password.length >= 6);
};

const verifyData = (email, password) => (
  (verifyEmail(email) && verifyPassword(password))
);

const SimpleCamps = (id, label, type, value, valid) => (
  {
    id,
    label,
    type,
    value,
    valid,
  }
);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRedirect, setIsRedirect] = useState(false);
  const objInputs = [
    {
      ...SimpleCamps('inputEmail','Email', 'email', email, verifyEmail(email)),
      onChange: value => setEmail(value),
    },
    {
      ...SimpleCamps('iptPwd','Senha', 'password', password, verifyPassword(password)),
      onChange: value => setPassword(value),
    },
    {
      type: 'button',
      value: 'Entrar',
      onClick: () => sendUser(email, password, setIsRedirect),
      disable: !verifyData(email, password),
    },
  ];
  if (isRedirect && getItemToken()) return <Redirect to="/" />;
  return <Form>{objInputs}</Form>;
};

export default Login;
