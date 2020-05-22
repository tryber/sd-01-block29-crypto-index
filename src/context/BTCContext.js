import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const BTCContext = createContext();
const BTCProvider = ({ children }) => {
  const [data, setData] = useState('');
  const [read, setRead] = useState('');
  const [write, setWrite] = useState();
  const [currency, setCurrency] = useState('BRL');

  const context = { data, setData, read, setRead, write, setWrite, currency, setCurrency };
  return <BTCContext.Provider value={context}>{children}</BTCContext.Provider>;
};

BTCProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BTCContext, BTCProvider as Provider };
