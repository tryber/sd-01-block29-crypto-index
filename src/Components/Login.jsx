import React from 'react';
import './Login.css'

export default function Login() {
  return (
    <section className="login">
      <span>
        <div className="label-email">Email</div>
        <input type="text" value="" id="input-email" className="input-email1" />
      </span>
      <span>
        <div className="label-senha">Senha</div>
        <input type="text" value="" id="input-senha" className="input-senha1" />
      </span>
      <span>
        <input type="submit" value="ENTRAR" id="input-btn" className="submit" />
      </span>
    </section>
  );
}
