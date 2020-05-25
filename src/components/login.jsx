import React, { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';
import axios from 'axios';
import { saveLocalStorage } from '../services/services';
import './login.css';

function FormLogin() {
  const { userEmail, userPassword, setUserEmail, setUserPassword } = useContext(CryptoContext);
  return (
    <form>
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
    </form>
  );
}

// const request = () => {
//   return {
//     { headers: { authorization: getLocalStorage(), 'Content-Type': 'application/json' } },
//     { body: JSON.stringify({ currency, value: parseInt(currencyValue, 10) }) }
//   );
// }
// };

export default function Login() {
  const { userEmail, userPassword } = useContext(CryptoContext);

  return (
    <div>
      {FormLogin()}
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
