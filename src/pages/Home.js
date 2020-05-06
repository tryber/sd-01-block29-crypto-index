import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Currency from '../componentes/Currency';
import Loading from '../componentes/Loading';
import { getItemToken } from './localStorageApi';

const createInput = (value, onChange) => (
  <div>
    <label htmlFor="bitcoin">Quantidade Bitcoin:</label>
    <input type="number" value={value} onChange={(e) => onChange(e.target.value)} />
  </div>
)

const Home = () => {
  const [data, setData] = useState('');
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
  console.log(bitcoin)
  return (
    <div className="Home">
      {loading || createInput(bitcoin, setBitcoin)}
      {loading && <Loading />}
      {(data !== '') && <Currency data={data} bitcoin={bitcoin} />}
    </div>
  );
};

export default Home;
