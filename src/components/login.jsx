import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import axios from 'axios';
import { saveLocalStorage } from '../services/services';

function FormLogin(setInfo, value, name) {
  return (
    <input
      type={name}
      name={name}
      value={value}
      onChange={(event) => setInfo(event.target.value)}
      required
    />
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
  const {
    userEmail,
    userPassword,
    setUserEmail,
    setUserPassword,
  } = useContext(CryptoContext);

  return (
    <section>
      <p>Email:</p>
      {FormLogin(setUserEmail, userEmail, 'email')}
      <p>Password:</p>
      {FormLogin(setUserPassword, userPassword, 'password')}
      <button
        type="submit"
        onClick={() => SendingRequestAndGettingTokenToUser(userEmail, userPassword)}
      >
        Entrar
      </button>
    </section>
  );
}
