import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import axios from 'axios';
import { saveLocalStorage } from '../services/services';
import './login.css';

function FormLoginUser() {
  const { userEmail, setUserEmail } = useContext(CryptoContext);
  return (
    <section>
      <label className="email" htmlFor="email">
        email:
        <input
          className="input-email"
          type="email"
          name="email"
          value={userEmail}
          onChange={(event) => setUserEmail(event.target.value)}
          placeholder="exemplo@exemplo.com"
          required
        />
      </label>
    </section>
  );
}

function FormLoginPassword() {
  const { userPassword, setUserPassword } = useContext(CryptoContext);
  return (
    <section>
      <label className="password" htmlFor="password">
        password:
        <input
          className="input-password"
          type="password"
          name="password"
          value={userPassword}
          onChange={(event) => setUserPassword(event.target.value)}
          placeholder="Digite sua senha"
          required
        />
      </label>
    </section>
  );
}

function SendingRequestAndGettingTokenToUser(userEmail, userPassword) {
  axios.post('http://localhost:3001/login', {
    email: userEmail,
    password: userPassword
  }).then((response) => {
    if (response.status = 200) saveLocalStorage(response.data.token);
  }).catch(err => console.log(err));
}

export default function Login() {
  const { userEmail, userPassword } = useContext(CryptoContext);

  return (
    <div>
      {FormLoginUser()}
      {FormLoginPassword()}
      <button
        className="form-submit"
        type="submit"
        onClick={() => SendingRequestAndGettingTokenToUser(userEmail, userPassword)}
      >
        Entrar
      </button>
    </div>
  );
}
