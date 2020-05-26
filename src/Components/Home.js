import React, { useEffect, useState } from 'react';

function getAuthenticationToken() {
  return localStorage.getItem('token');
}

async function getFloatValues(setValues) {
  const values = await fetch("http://localhost:3001/crypto/btc", { headers: { authorization: getAuthenticationToken() } }).then(res => res.json());
  setValues(values.bpi);
}

function Home() {
  const [values, setValues] = useState({});
  const [btcValue, setBtcValue] = useState(1);

  useEffect(() => {
    getFloatValues(setValues)
  }, []);

  const {BTC, ...coinTypes} = values;
  if (btcValue < 1) setBtcValue(1);
  return (
    <div>
      <label htmlFor="btc-value">BTC: </label>
      <input type="number" name="btc-value" onChange={(e) => setBtcValue(e.target.value)} />
      {Object.entries(coinTypes).map((type) => {
        return type[0];
      }).map((coinType => <p>{coinType} - {values[coinType].rate_float * btcValue}</p>))}
    </div>
  );
}

export default Home;
