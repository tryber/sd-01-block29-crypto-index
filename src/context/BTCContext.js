import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';
const BTCContext = createContext();
const BTCProvider = ({ children }) => {
  const [data, setData] = useState('');
  
  const context = { data, setData };
  return <BTCContext.Provider value={context}>{children}</BTCContext.Provider>;
};

BTCProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { BTCContext, BTCProvider as Provider };
