import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

import PropTypes from 'prop-types';

const BTCContext = createContext();
const BTCProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [update, setUpdate] = useState(false);

  const URL = 'http://localhost:3001/crypto/btc';
  const tokens = localStorage.getItem('token');
  const configurations = {
    headers: { authorization: tokens, 'Content-Type': 'application/json' },
  };

  const fetchData = async () => {
    const response = await axios.get(URL, configurations);
    return setData(response.data.data);
  };

  useEffect(() => {
    fetchData();
    setUpdate(false);
  }, [update]);

  const context = {
    data,
    setData,
    update,
    setUpdate,
  };

  return <BTCContext.Provider value={context}>{children}</BTCContext.Provider>;
};

BTCProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BTCContext, BTCProvider as Provider };
