import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { getItemToken } from '../pages/localStorageApi';
import Loading from './Loading';

const ShowCoinValue = ({ coin }) => {
  const [values, setValues] = useState();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios.get(
        'http://localhost:3001/crypto/currency',
        {
          headers: { authorization: getItemToken() },
        }).then((response) => {
          setValues(response.data.dados);
          setLoading(false);
        }).catch(err => console.log(err));
    }
  }, []);
  if (loading || !values) return <Loading />;
  return (
    <div>
      <h2>{`Valor Atual:${values[coin]}`}</h2>
    </div>
  );
};

export default ShowCoinValue;

ShowCoinValue.propTypes = {
  coin: PropTypes.string.isRequired,
};
