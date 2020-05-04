import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^[0-9]{6}$/;

function validateLogin(email, password) {
  if (email.match(emailRegex) && password.match(passwordRegex)) return true;
  return false;
}

async function submitForm(e, email, password, setShouldRedirect) {
  e.preventDefault();
  if (validateLogin(email, password)) {
    await fetch('http://localhost:3001/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then(res => res.json())
      .then(result =>
        result.token
          ? localStorage.setItem('token', result.token)
          : alert(result.message)
      );
    return setShouldRedirect(true);
  }
  alert('dados inválidos!');
}

function generateInput(type, value, func) {
  return (
    <input
      type={type}
      name={value}
      placeholder={value}
      onChange={e => func(e.target.value)}
    />
  );
}
function Login() {
  const [shouldRedirect, setShouldRedirect] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (shouldRedirect) return <Redirect to="/" />;
  return (
    <div>
      <form onSubmit={e => submitForm(e, email, password, setShouldRedirect)}>
        {generateInput('text', 'email', setEmail)}
        {generateInput('password', 'password', setPassword)}
        <button>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
