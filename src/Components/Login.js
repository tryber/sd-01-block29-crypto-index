import React, {useState} from 'react';
import axios from 'axios';

const input = (className, email, onChange, placeholder) => (
  <input
    type="text"
    className={className}
    value={email}
    required
    onChange={e => onChange(e.target.value)}
    placeholder={placeholder}
  />
);

const forms = (handleSubmit, email, senha, setEmail, setSenha) => (
  <form method="post" onSubmit={handleSubmit}>
    {input('input-email1', email, setEmail, 'EMAIL')}
    {input('input-senha1', senha, setSenha, 'SENHA')}
    <button type="submit" className="submit">
      ENTRAR
    </button>
  </form>
);

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/login', {
        email,
        password: senha,
      });
      localStorage.setItem('token', response.data.token);
      setEmail('');
      setSenha('');
    } catch (error) {
      if (!error.response) {
        return console.log('aqui mostra o que deu ruim', error);
      }
      console.log('→→', error.response.status, error.response.data);
    }
  };

  return (
    <section className="login">
      {forms(handleSubmit, email, senha, setEmail, setSenha)}
    </section>
  );
}



export default Login;
