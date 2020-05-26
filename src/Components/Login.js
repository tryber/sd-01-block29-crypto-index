import React, { useState } from 'react';

function validateFields(email, password) {
  const emailRegex = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (email.match(emailRegex) && typeof password === 'number' && !isNaN(password)) return true;
}

async function handleSubmit(event, setErrorMessage) {
  event.preventDefault();
  const email = event.target.email.value;
  const password = event.target.password.value;
  const body = { email, password };
  const res = await fetch('http://localhost:3001/login', { method: 'post', body: JSON.stringify(body), headers: { 'Content-Type': 'application/json' } });
  if (res.status !== 200) {
    const data = await res.json();
    return setErrorMessage(`Erro: ${data.message}`);
  }
  const token = await res.json();
  localStorage.setItem('token', token);
}

function Login() {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={e => handleSubmit(e, setErrorMessage)}>
        <input
          required type="email" name="email" placeholder="Digite seu Email"
          onChange={e => setUserEmail(e.target.value)}
        />
        <input
          required type="password" minLength="6" maxLength="6"
          name="password" placeholder="Digite sua Senha"
          onChange={e => setUserPassword(Number(e.target.value))}
        />
        {errorMessage && <p id="error-msg">{errorMessage}</p>}
        <input
          className="form-submit" type="submit" value="Entrar"
          disabled={!validateFields(userEmail, userPassword)}
        />
      </form>
    </div>
  );
}

export default Login;
