import React, { useState, useEffect } from 'react';
import '../style/Coins.css';

const coinsObj = {BRL: "5.400",EUR:"0.920",CAD:"1.440"};

const fetchPost = (currency, value) => {
  return fetch("http://localhost:3001/crypto/btc", {
    method: "post",
    body: JSON.stringify({ currency, value:parseInt(value, 10) }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json())
  .then(response => alert(response.message));
};

const validateValue = (select, numberText, setBtn) => {
  if(Number.isInteger(numberText) || numberText !== 0 || numberText !== '') {
    coinsObj[select] = numberText;
    console.log("oi2")
    console.log("coinsObj", coinsObj[select])
    setBtn(numberText)
  }
  console.log("oi")
  fetchPost(select, numberText);
}

const generateSelect = (
  setSelect, select
) => (
  <div>
    <select
      className="select-coins"
      onChange={(e) => setSelect(e.target.value)}
    >
      <option value="BRL">BRL</option>
      <option value="EUR">EUR</option>
      <option value="CAD">CAD</option>
    </select>
    <h2>Valor atual:</h2>
    <h2>{coinsObj[select]}</h2>
  </div>
);

const Coins = () => {
const [select, setSelect] = useState('BRL');
const [numberText, setNumberText] = useState('');
const [data, setData] = useState();
const [btn, setBtn] = useState();


useEffect(() => {
  setData(generateSelect(setSelect, select))
}, [btn]);

return (
  <div>
    <h2>MOEDA</h2>
    {data}
    <h2>NOVO VALOR</h2>
    <input
      className="input-number"
      type="Number" 
      value={numberText}
      onChange={(e) => setNumberText(e.target.value)}
      placeholder="Digite o bitcoin"
    />
    <input 
      className="form-submit" 
      type="submit" 
      value="Atualizar" 
      onClick={() => validateValue(select, Number(numberText), setBtn)}
    />
  </div>
  );
}

export default Coins;
