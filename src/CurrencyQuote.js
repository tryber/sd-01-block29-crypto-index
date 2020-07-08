import React, { useState } from 'react';

const currencies = {
  BRL: '5.400',
  EUR: '0.920',
  CAD: '1.440',
};

async function updateValue(selectedCurrency, newValue) {
  await fetch('http://localhost:3001/crypto/btc', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: localStorage.token,
    },
    body: JSON.stringify({
      currency: selectedCurrency,
      value: parseInt(newValue, 10),
    }),
  })
    .then(res => res.json())
    .then(result => alert(result.message));
}

function CurrencyQuote() {
  const [selectedCurrency, setSelectedCurrency] = useState('BRL');
  const [newValue, setNewValue] = useState();

  return (
    <div>
      <p>Moeda</p>
      <select onChange={e => setSelectedCurrency(e.target.value)}>
        <option value="BRL">BRL</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
      </select>
      <p>Valor atual: {currencies[selectedCurrency]}</p>
      <p>Novo valor</p>
      <input onChange={e => setNewValue(e.target.value)} />
      <button onClick={() => updateValue(selectedCurrency, newValue)}>
        ATUALIZAR
      </button>
    </div>
  );
}

export default CurrencyQuote;
