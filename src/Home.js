import React, { useEffect, useState } from 'react';

const desiredValues = ['BRL', 'CAD', 'EUR', 'USD'];
function generateValues({ bpi }, btcValue) {
  return desiredValues.map((value) => {
    return (
      <div key={bpi[value].code}>
        <p>{bpi[value].code}</p>
        <p>{(bpi[value].rate_float * btcValue).toFixed(2)}</p>
      </div>
    );
  });
}

function Home() {
  useEffect(() => {
    async function fetchData() {
      await fetch('http://localhost:3001/crypto/btc')
        .then((res) => res.json())
        .then((result) => setData(result));
    }
    fetchData();
  }, []);

  const [btcValue, setBtcValue] = useState(1);
  const [data, setData] = useState('');

  if (data === '') return <div>Carregando...</div>;
  return (
    <div>
      <div>
        <p>BTC</p>
        <input
          type="number"
          value={btcValue}
          onChange={(e) => setBtcValue(e.target.value)}
        />
      </div>
      <div>{generateValues(data, btcValue)}</div>
    </div>
  );
}

export default Home;
