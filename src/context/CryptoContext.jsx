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
  const [selectedCoin, setSelectedCoin] = useState('BRL');
  const [currentCurrencyValue, setCurrenctCurrencyValue] = useState({});
  const [changeValueCurrency, setChangeValueCurrency] = useState();

  const getData = async () => {
    return axios.get('http://localhost:3001/crypto/btc',
      { headers: { authorization: getLocalStorage(), 'Content-Type': 'application/json' } })
      .then(({ data }) => setData(data.bpi))
      .catch(error => setData(error));
  };

  const getCurrency = async () => {
    return axios.get('http://localhost:3001/currencies',
      { headers: { 'Content-Type': 'application/json' } })
      .then((currency) => setCurrenctCurrencyValue(currency.data))
      .catch(error => setCurrenctCurrencyValue(error));
  };

  const context = {
    changeValueCurrency,
    currentCurrencyValue,
    data,
    selectedCoin,
    getCurrency,
    userEmail,
    userPassword,
    updateBitcon,
    setChangeValueCurrency,
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
