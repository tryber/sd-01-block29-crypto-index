import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Currency from '../componentes/Currency';
import Loading from '../componentes/Loading';
import { getItemToken } from './localStorageApi';

const CreateInput = ({ value, onChange }) => (
  <div>
    <label htmlFor="bitcoin">Quantidade Bitcoin:</label>
    <input type="number" value={value} onChange={e => onChange(e.target.value)} />
  </div>
);

const Home = () => {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [bitcoin, setBitcoin] = useState(1);
  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios.get(
        'http://localhost:3001/crypto/btc',
        {
          headers: { authorization: getItemToken() },
        }).then((response) => {
          setData(response.data);
          setLoading(false);
        }).catch(err => console.log(err));
    }
  }, []);
  if (loading || !data) return <Loading />;
  return (
    <div className="Home">
      <CreateInput value={bitcoin} onChange={(value) => setBitcoin(value)} />
      <Currency data={data} bitcoin={bitcoin} />
    </div>
  );
};

export default Home;

CreateInput.propTypes = {
  value: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired,
};
