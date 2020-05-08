import React, { useState } from 'react';

function setCoins(data, quantityCoins, setQuantityCoins) {
  const { USD, BTC, BRL, EUR, CAD } = data.bpi;

  return (
    <div>
      <div>
        <input
          type="number"
          placeholder="Quantidade"
          onChange={event => setQuantityCoins(event.target.value)}
        />
      </div>
      <p>
        {BTC.rate_float * quantityCoins}
      </p>
    </div>
  );
}

function requestConfig() {
  return {
    method: 'GET',
    headers: {
      'Authorization': localStorage.token,
      'Content-Type': 'application/json'
    },
  };
}

async function getAPI(quantityCoins, setQuantityCoins) {
  try {
    console.log('nem chega aqui')
    const response = await fetch('http://localhost:3001/crypto/btc', requestConfig());
    const data = await response.json();
    
    return setCoins(data, quantityCoins, setQuantityCoins);
  } catch (err) {
    console.log(err)
  }
}

function Home() {
  const [quantityCoins, setQuantityCoins] = useState();
  return (
    <div>
     {getAPI(quantityCoins, setQuantityCoins)}
    </div>
  );
}

export default Home;
