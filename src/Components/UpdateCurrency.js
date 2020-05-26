import React, { useEffect, useState } from 'react';

function getAuthenticationToken() {
  return localStorage.getItem('token');
}

async function getDolarPrices(setDolarPrices) {
  const { currencies } = await fetch('http://localhost:3001/crypto/btc', { headers: { authorization: getAuthenticationToken() } }).then(res => res.json());
  setDolarPrices(currencies);
}

async function updateCurrencyValue(currencyValue, selectedCurrency, setUpdate) {
  const updatedCurrency = { currency: selectedCurrency, value: Number(currencyValue) }
  const res = await fetch('http://localhost:3001/crypto/btc', {
    method: 'post',
    body: JSON.stringify(updatedCurrency),
    headers: { authorization: getAuthenticationToken(), 'Content-Type': 'application/json' }
  }).then(res => res.json());
  alert(res.message);
  setUpdate(true);
}

function UpdateCurrency() {
  const [dolarPrices, setDolarPrices] = useState({});
  const [selectedCurrency, setCurrency] = useState('BRL');
  const [currencyValue, setCurrencyValue] = useState(0);
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    getDolarPrices(setDolarPrices);
    setUpdate(false);
  }, [update]);

  return (
    <div>
      <label htmlFor="currency">Moeda:</label>
      <select name="currency" onChange={e => setCurrency(e.target.value)}>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p><strong>Valor atual:</strong> {dolarPrices[selectedCurrency]}</p>
      <label htmlFor="btc-value">Novo valor: </label>
      <input type="number" name="btc-value" onChange={e => setCurrencyValue(e.target.value)} />
      <button type="button" onClick={() => updateCurrencyValue(currencyValue, selectedCurrency, setUpdate)}>ATUALIZAR</button>
    </div>
  );
}

export default UpdateCurrency;
