import React, { useState } from 'react';
import useAxios from 'axios-hooks';

function coins(bitcoinAPI, quantityCoins, setQuantityCoins) {
  const { USD, BTC, BRL, EUR, CAD } = bitcoinAPI.bpi;

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Quantidade"
          onChange={(event) => setQuantityCoins(event.target.value)}
        />
      </div>
      <p>
        {BTC.rate_float * quantityCoins}
      </p>
    </div>

  )
}

function Home() {
  const [quantityCoins, setQuantityCoins] = useState();
  const [bitcoinAPI] = useAxios('http://localhost:3001/crypto/btc');

  return (
    <div>
      {coins(bitcoinAPI, quantityCoins, setQuantityCoins)}
    </div>
  )
}

export default Home;
