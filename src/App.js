import React from 'react';
//import Price from './Components/Price';
// import Login from './Components/Login';
import Home from './Components/Home';
import { Provider } from './context/BTCContext';

const componentMajor = () => (
  <div className="conteiner">
    {/* <Login /> */}
    {/* <Price /> */}
    <Home />
  </div>
);

const App = () => <Provider>{componentMajor()}</Provider>;

export default App;
