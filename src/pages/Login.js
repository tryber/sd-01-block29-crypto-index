import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from "react-router-dom";
import axios from 'axios';
import Form from '../componentes/Form';
import ErrorApi from '../componentes/ErrorApi';

const sendUser = (email, password, shouldRedirect, setIsError) => {
  console.log('FOI SendUser', email, password)
  axios.post('http://localhost:3005/login', {
    email,
    password,
  }).then((resp) => {
    console.log(resp, 'resp')
    localStorage.setItem("token", resp.data.token);
    if (resp.status === 200) return shouldRedirect(true);
    if (resp.status === 401) return setIsError(resp.data.message);
    setIsError('error');
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
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [isError, setIsError] = useState('');

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
      onClick: () => sendUser(email, password, setShouldRedirect, setIsError),
      disable: !verifyData(email, password),
    },
  ];

  if (shouldRedirect) return <Redirect to="/" />
  if (isError !== '') return <ErrorApi />

  return (
    <Form>
      {objInputs}
    </Form>
  );
};

export default Login;


// <div className="Input">
// <label htmlFor="EmailId">
//   Email
// </label>
// <input
//   id="EmailId"
//   type="Email"
//   value={email}
//   onChange={(e)=>setEmail(e.target.value)}
//   className={isValid}
//   disabled={disable}
// />
// </div>
