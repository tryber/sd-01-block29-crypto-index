import React, { useState, useEffect } from 'react';

function setCoins(data, quantityCoins, setQuantityCoins, setUpdateValue, updateValue) {
  const { USD, BRL, EUR, CAD } = data.bpi;
  const coins = [['USD', USD], ['BRL', BRL], ['EUR', EUR], ['CAD', CAD]];

  return (
    <div>
      <button type="button" onClick={() => setUpdateValue(quantityCoins)}>
        Atualizar Valores
      </button>
      <div>
        BTC:
        <input
          type="number"
          placeholder="Quantidade"
          value={quantityCoins}
          onChange={event => setQuantityCoins(event.target.value)}
        />
      </div>
      {coins.map(coin => (
        <p>{`${coin[0]}: ${coin[1].rate_float * updateValue}`}</p>
      ))}
    </div>
  );
}

function requestConfig() {
  return {
    method: 'GET',
    headers: {
      Authorization: localStorage.token,
      'Content-Type': 'application/json',
    },
  };
}

async function getAPI(quantityCoins, setQuantityCoins, setUpdateValue, updateValue) {
  try {
    const response = await fetch('http://localhost:3001/crypto/btc', requestConfig());
    const data = await response.json();

    return setCoins(data, quantityCoins, setQuantityCoins, setUpdateValue, updateValue);
  } catch (err) {
    console.log(err);
  }
}

function Home() {
  const [quantityCoins, setQuantityCoins] = useState(1);
  const [data, setData] = useState();
  const [updateValue, setUpdateValue] = useState(1);

  useEffect(() => {
    if (quantityCoins >= 0)
      getAPI(quantityCoins, setQuantityCoins, setUpdateValue, updateValue)
        .then(response => setData(response));
  }, [quantityCoins, updateValue]);

  if (!data) return 'Loading...';
  return (
    <div>
      {data}
    </div>
  );
}

export default Home;
