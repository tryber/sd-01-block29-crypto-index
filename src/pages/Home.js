import React, { useEffect, useState } from 'react';
import UseAxios from 'axios-hooks';
import Currency from '../componentes/Currency';
import Loading from '../componentes/Loading';
import ErrorApi from '../componentes/ErrorApi';

const Home = () => {
  const [result] = UseAxios({
    url: 'http://localhost:3005/crypto/btc',
    method: 'GET',
    headers: {
      authorization: '1234567890123456',
    }
  }
  );

  const [data, setData] = useState('');

  useEffect(() => {
    if (!result.loading) setData(result.data)
  })
  if (data !== '') {
    console.log(data.bpi, 'data')
  }
  return (
    <div className="Home">
      {result.loading && <Loading />}
      {result.error && <ErrorApi />}
      {(data !== '') && <Currency data={data} />}
    </div>
  );
};

export default Home;
