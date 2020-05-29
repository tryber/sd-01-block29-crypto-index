import React, { createContext, useState } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

const BTCContext = createContext();
const BTCProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [read, setRead] = useState('');
  const [write, setWrite] = useState();
  const [currency, setCurrency] = useState('BRL');

  console.log(data, read);

  const URL = 'http://localhost:3001/crypto/btc';
  const tokens = localStorage.getItem('token');
  const configurations = {
    headers: { authorization: tokens, 'Content-Type': 'application/json' },
  };

  const body = {
    currency,
    value: Number(write),
  };

  const fetchData = async () => {
    const { data } = await axios.get(URL, configurations);
    return setData(data.data);
  };

  const fetchDataGet = async () => {
    const { data:{ data } } = await axios.get(URL, configurations);
    return setRead(data);
  };

  const handleSubmit = async () => axios.post(URL, body, configurations);
  
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
