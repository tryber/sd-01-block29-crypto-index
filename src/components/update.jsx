import React from 'react';
import { useContext } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function CurrencyUpdateForm() {
  const { data, selectedCoin, setSelectedCoin } = useContext(CryptoContext);
  
  return (
    <div>
      <label>
        Moeda
        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
          <option value="1">BRL</option>
          <option value="2">EUR</option>
          <option value="3">CAD</option>
        </select><br />
      </label>
        <span>Valor Atual: {selectedCoin} </span><br />
        <label>
          Novo Valor
          <input type="number" />
          <button type="button">Atualizar</button>
        </label>
    </div>
  );
}

function gerCurrency() {
  axios.post('http://localhost:3001/crypto/btc', {
      currency: "BRL",
      value: 10000.0
  }).then((response) => {
    if (response.status = 200) saveLocalStorage(response.data.token);
  }).catch(err => console.log(err));

export default function Update() {
  return (
    <div>
      {CurrencyUpdateForm()}
    </div>
  );
}
