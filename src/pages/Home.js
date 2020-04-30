import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Currency from '../componentes/Currency';
import Loading from '../componentes/Loading';

const Home = () => {
  // const [result] = axios.get({
  //   url: 'http://localhost:3005/crypto/btc',
  //   method: 'GET',
  //   headers: {
  //     authorization: '1234567890123456',
  //   }
  // }
  // );

  const [data, setData] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('UPDATE')
    if (!loading) {
      setLoading(true);
      axios.get('http://localhost:3005/crypto/btc', {
        headers: {
          authorization: '1234567890123456',
        }
      })
      .then((response) => {
        console.log('fim, fetch',response);
        setData(response.data);
        setLoading(false);
      })
    }
  },[])

  if (data !== '') {
    console.log(data.bpi, 'data')
  }
  console.log(data)
  console.log(loading,'load')
  return (
    <div className="Home">
      {loading && <Loading />}
      {(data !== '') && <Currency data={data} />}
    </div>
  );
};

export default Home;
