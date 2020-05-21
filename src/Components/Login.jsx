import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

export default function Login() {
    
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios
        .post('http://localhost:3001/login', {
          email,
          password: senha,
        });
      localStorage.setItem('token', response.data.token)
      setEmail('');
      setSenha ('');
    }
    catch (error) {
      if (!error.response) {
      return console.log('aqui mostra o que deu ruim', error);
      }
      console.log('→→',error.response.status, error.response.data);
    }
  };

  return (
    <section className="login">
      <form method="post" onSubmit={handleSubmit}>
        <input
          type="text"
          className="input-email1"
          value={email}
          required
          onChange={e => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          className="input-senha1"
          value={senha}
          required
          onChange={e => setSenha(e.target.value)}
          placeholder="Senha"
        />
        <button type="submit" className="submit">
          ENTRAR
        </button>
      </form>
    </section>
  );
}
