import React from 'react';
import './App.css'
import { Provider } from './context/CryptoContext';
// import Login from './components/login';
import Home from './components/home';

function App() {
  return (
    <div>
      <Provider>
        {/* <Login /> */}
        <Home />
      </Provider>
    </div>
  );
}

export default App;
