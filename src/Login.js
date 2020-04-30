import React, { useState } from 'react';
import './Login.css';
import { Link } from 'react-router-dom';

const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const passwordRegex = /^[0-9]{6}$/;

async function submitForm(e, email, password) {
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
      .then((res) => res.json())
      .then((result) => localStorage.setItem('token', result.token));
  }
  alert('dados inválidos!');
  // e.preventDefault();
  return false;
}

function validateLogin(email, password) {
  if (email.match(emailRegex) && password.match(passwordRegex)) return true;
  return false;
}

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <form onSubmit={(e) => submitForm(e, email, password)}>
        <input
          type="text"
          name="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {/* <Link to="/" style={{ pin}}>Entrar</Link> */}
        <button>Entrar</button>
      </form>
    </div>
  );
}

export default Login;
