import React from 'react';

function form() {
  return (
    <form >
      <label>
        email:
      <input type="email" name="email" />
      </label>
      <label>
        password:
      <input type="password" name="password" />
      </label>
      <button type="submit">Entrar</button>
    </form>
  )
}

function Login() {
  return (
    <div>
      {form()}
    </div>
  )
}

export default Login;
