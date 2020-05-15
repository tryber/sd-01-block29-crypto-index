import React from 'react';

export default function Login() {
  return (
    <div className="container">
      <div className="login">
        <span>
          <h2>Email</h2>
          <input type="text" />
        </span>
        <span>
          <h2>Senha</h2>
          <input type="text" />
        </span>
        <span>
          <h2>Senha</h2>
          <button type="submit">ENTRAR</button>
        </span>
      </div>
    </div>
  );
}
