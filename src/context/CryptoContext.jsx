import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { getLocalStorage } from '../services/services';

const CryptoContext = createContext();

const CryptoProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [userPassword, setUserPassword] = useState();
  const [updateBitcon, setUpdateBitcoin] = useState(1);
  const [selectedCoin, setSelectedCoin] = useState();

  const getData = async () => {
    return axios.get('http://localhost:3001/crypto/btc',
      { headers: { authorization: getLocalStorage(), 'Content-Type': 'application/json' } })
      .then(({ data }) => setData(data.bpi))
      .catch(error => setData(error));
  };

  const context = {
    data,
    selectedCoin,
    userEmail,
    userPassword,
    updateBitcon,
    setSelectedCoin,
    setUserEmail,
    setUserPassword,
    setUpdateBitcoin,
    getData
  };

  return (
    <CryptoContext.Provider value={context}>
      {children}
    </CryptoContext.Provider>
  );
};

CryptoProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { CryptoContext, CryptoProvider as Provider };
