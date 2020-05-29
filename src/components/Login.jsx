import React, { useState } from "react";
import "../style/Login.css";

async function handleSubmit(event, userEmail, userPassword) {
  event.preventDefault();
  const { token, message } = await fetchPost(userEmail, userPassword);
  if (message) return alert(message);
  localStorage.setItem("token", token);
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
      type="password"
      placeholder="Digite sua Senha"
      onChange={(e) => {
        setUserPassword(e.target.value);
      }}
    />
  );
}

const fetchPost = (email, password) => {
  return fetch("http://localhost:3001/login", {
    method: "post",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  }).then((res) => res.json());
};

function Login() {
  const [userPassword, setUserPassword] = useState();
  const [userEmail, setUserEmail] = useState("");

  return (
    <div className="login">
      <h1>Login</h1>
      <form
        className="login-form"
        onSubmit={(e) => handleSubmit(e, userEmail, userPassword)}
      >
        {inputEmail(setUserEmail)}
        {inputPassword(setUserPassword)}
        <p className="invalid-feedback" />
        <input className="form-submit" type="submit" value="Entrar" />
      </form>
    </div>
  );
}

export default Login;
