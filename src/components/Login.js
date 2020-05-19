import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import '../style/Login.css';

function handleSubmit(event, setRedirect) {
  event.preventDefault();
  setRedirect(true);
}

function inputEmail(setUserEmail) {
  return (
    <input
      className="form-input"
      required
      type="email"
      placeholder="Digite seu Email"
      onChange={(e) => {
        setUserEmail(e.target.value);
      }}
    />
  );
}

function inputPassword(setUserPassword) {
  return (
    <input
      className="form-input"
      required
      minLength="6"
      type="password"
      placeholder="Digite sua Senha"
      onChange={(e) => {
        setUserPassword(e.target.value);
      }}
    />
  );
}

function Login() {
  const [_userPassword, setUserPassword] = useState();
  const [shouldRedirect, setRedirect] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  if (shouldRedirect) return <Redirect to="/receitas" />;
  return (
    <div className="login">
      <h1>Login</h1>
      <form className="login-form" onSubmit={(e) => handleSubmit(e, setRedirect, userEmail)}>
        {inputEmail(setUserEmail)}
        {inputPassword(setUserPassword)}
        <p className="invalid-feedback" />
        <input className="form-submit" type="submit" value="Entrar" disabled />
      </form>
    </div>
  );
}

export default Login;
