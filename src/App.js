import React from 'react';
import './App.css'
import { Provider } from './context/CryptoContext';
import Login from './components/login';
import Home from './components/home';
import Update from './components/update';

function App() {
  return (
    <div>
      <Provider>
        <Login /> <br /> <br />
        <Home /> <br /> <br />
        <Update />
      </Provider>
    </div>
  );
}

export default App;
