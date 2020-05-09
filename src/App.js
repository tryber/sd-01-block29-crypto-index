import React from 'react';
import './App.css'
import Login from './components/Login';
import Home from './components/Home';
import UpdateCoins from './components/UpdateCoin';

function App() {
  return (
    <div>
      <Login />
      <Home />
      <UpdateCoins />
    </div>
  );
}

export default App;
