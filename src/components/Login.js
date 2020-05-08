import React, { useState } from 'react';

import { tokenGenerate } from '../../api/routerLogin';

function Login(setUser, type, placeholder) {
  return (
    <input
      type={type}
      name={type}
      placeholder={placeholder}
      required
      onChange={(event) => setUser(event.target.value)}
    />
  )
}

function emailValid(email = '') {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function passwordValid(password = '') {
  const regex = /^\d+$/;
  return password.length === 6;
}

function newToken(userEmail, userPassword, setInvalidForm) {
  if (!emailValid(userEmail) || !passwordValid(userPassword))
    return setInvalidForm('Campos inválidos');

  else
    return (
      setInvalidForm(''),
      localStorage.setItem('token', tokenGenerate)
    )
}

function LoginForms() {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [invalidForm, setInvalidForm] = useState('');

  //http://localhost:3001/login;

  return (
    <form>
      {Login(setUserEmail, 'email', 'Email')}
      {Login(setUserPassword, 'password', 'Senha')}
      <button
        type='button'
        onClick={() => newToken(userEmail, userPassword, setInvalidForm)}
      >
        Entrar
      </button>
      {invalidForm}
    </form>
  )
}

export default LoginForms;
