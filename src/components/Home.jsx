import React, { useState, useEffect } from 'react';
import '../style/Home.css';

const fetchHome = () => {
  return fetch('http://localhost:3001/crypto/btc')
    .then(res => res.json())
    .then( response => response.data.bpi)
}

const coin = (data, numberText) => {
  return data.map((tag, index) => {
    if(index !== 1)
    return (
      <table>
        <tr key={tag.code}>
          <th key={tag.code}>{tag.code}</th>
        </tr>
        <tr key={tag.rate_float}>
          <td className='value' key={tag.rate_float}>{numberText * tag.rate_float}</td>
        </tr>
      </table>
    );
  })
}

const Home = () => {
  const [userCoins, setUserCoins] = useState([]);
  const [numberText, setNumberText] = useState(1);

  useEffect(() => {
    fetchHome().then(setUserCoins);
  }, [numberText]);

  const coins = Object.values(userCoins)

  return (
    <div>
      {coin(coins, numberText)}
      <h2>BTC</h2>
      <input
        min={1}
        className="input-number"
        type="Number"
        value={numberText}
        onChange={(e) => e.target.value > 0 ? setNumberText(e.target.value) : setNumberText(numberText)}
        placeholder="Digite o bitcoin"
      />
    </div>
  );
}

export default Home;
