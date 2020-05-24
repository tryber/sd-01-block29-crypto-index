import React, { useContext, useEffect } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function ShowValues() {
  const { data, updateBitcon, setUpdateBitcoin } = useContext(CryptoContext);
  const coins = Object.entries(data);

  return (
    <div>
      <button type="button" onClick={setUpdateBitcoin(updateBitcon)}>
        Atualizar valor monetário
      </button>
      <div>
        BTC:
        <input
          type="number"
          value={updateBitcon}
          onChange={(event) => setUpdateBitcoin(event.target.value)}
        />
      </div>
      {coins.map(coin => (
        <p key={coin[0]}>{`${coin[0]}: ${coin[1].rate_float * updateBitcon}`
        }</p>
      ))}
    </div>
  );
};

function Home() {
  const { getData } = useContext(CryptoContext);

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      {ShowValues()}
    </div>
  );
}

export default Home;
