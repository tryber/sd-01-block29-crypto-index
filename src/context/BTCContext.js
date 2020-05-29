import React, { createContext, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

const BTCContext = createContext();
const BTCProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [read, setRead] = useState('');
  const [write, setWrite] = useState();
  const [currency, setCurrency] = useState('BRL');

  const fetchData = async () => {
    const URL = 'http://localhost:3001/crypto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    return axios
      .get(URL, configurations)
      .then(({ data }) => setData(data.data))
      .catch(error => setData(error));
  };

  const fetchDataGet = async () => {
    const URL = 'http://localhost:3001/crypto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    return axios
      .get(URL, configurations)
      .then(({ data }) => {
        setRead(data.data);
      })
      .catch(error => setRead(error));
  };

  const handleSubmit = async () => {
    const URL = 'http://localhost:3001/crypto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    const body = {
      currency,
      value: Number(write),
    };
    return axios
      .post(URL, body, configurations)
      .then(({ data }) => console.log('data', data))
      .catch(err => console.error(err.response.data.message));
  };

  const context = {
    setData,
    setRead,
    setWrite,
    setCurrency,
    fetchData,
    fetchDataGet,
    handleSubmit,
  };
  return <BTCContext.Provider value={context}>{children}</BTCContext.Provider>;
};

BTCProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BTCContext, BTCProvider as Provider };
