import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Currency from '../componentes/Currency';
import Loading from '../componentes/Loading';

const Home = () => {
  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!loading) {
      setLoading(true);
      axios.get('http://localhost:3005/crypto/btc', {
        headers: {
          authorization: localStorage.getItem('token'),
        }
      })
        .then((response) => {
          setData(response.data);
          setLoading(false);
        })
        .catch(err => console.error(err))
    }
  }, [])

  return (
    <div className="Home">
      {loading && <Loading />}
      {(data !== '') && <Currency data={data} />}
    </div>
  );
};

export default Home;
