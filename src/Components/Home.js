import React, { useEffect, useState } from 'react';

function getAuthenticationToken() {
  return localStorage.getItem('token');
}

async function getCurrencyDetails(setCurrencies) {
  const currencies = await fetch('http://localhost:3001/crypto/btc', { headers: { authorization: getAuthenticationToken() } }).then(res => res.json());
  setCurrencies(currencies.data.bpi);
}

function Home() {
  const [currencies, setCurrencies] = useState({});
  const [btcValue, setBtcValue] = useState(1);

  useEffect(() => {
    getCurrencyDetails(setCurrencies);
  }, []);

  const { BTC, ...currencyTypes } = currencies;
  if (btcValue < 1) setBtcValue(1);
  return (
    <div className="content">
      <label htmlFor="btc-value">BTC: </label>
      <input type="number" name="btc-value" onChange={e => setBtcValue(e.target.value)} />
      {Object.entries(currencyTypes).map(type => type[0])
      .map((coinType => <p>{coinType} - {currencies[coinType].rate_float * btcValue}</p>))}
    </div>
  );
}

export default Home;
