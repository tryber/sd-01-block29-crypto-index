import React, { useState } from 'react';

function LoginForms(setUser, type, placeholder, value) {
  return (
    <input
      type={type}
      name={type}
      value={value}
      placeholder={placeholder}
      required
      onChange={event => setUser(event.target.value)}
    />
  );
}

function emailValid(email = '') {
  const regex = /^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return regex.test(email);
}

function passwordValid(password = '') {
  const regex = /^\d+$/;
  return regex.test(password) && password.length === 6;
}

function requestConfig(userEmail, userPassword) {
  return {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: userEmail,
      password: userPassword,
    })
  };
}

async function newToken(userEmail, userPassword, setInvalidForm) {
  if (!emailValid(userEmail) || !passwordValid(userPassword))
    return setInvalidForm('Campos inválidos');

  const response = await fetch('http://localhost:3001/login', requestConfig(userEmail, userPassword));
  const data = await response.json();

  localStorage.setItem('token', data.token);

  return setInvalidForm('');
}

function Login() {
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [invalidForm, setInvalidForm] = useState('');

  return (
    <form>
      {LoginForms(setUserEmail, 'email', 'Email', userEmail)}
      {LoginForms(setUserPassword, 'password', 'Senha', userPassword)}
      <button
        type="button"
        onClick={() => newToken(userEmail, userPassword, setInvalidForm)}
      >
        Entrar
      </button>
      {invalidForm}
    </form>
  );
}

export default Login;
