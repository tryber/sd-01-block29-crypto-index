import React from 'react';
import { useContext, useEffect } from 'react';
import { CryptoContext } from '../context/CryptoContext';

function CurrencyUpdateForm() {
  const { selectedCoin, setSelectedCoin, currentCurrencyValue } = useContext(CryptoContext);

  return (
    <div>
      <label>
        Moeda
        <select value={selectedCoin} onChange={(e) => setSelectedCoin(e.target.value)}>
          <option value='BRL'>BRL</option>
          <option value='EUR'>EUR</option>
          <option value='CAD'>CAD</option>
        </select><br />
      </label>
        <span>Valor Atual: {currentCurrencyValue[selectedCoin]} </span><br />
        <label>
          Novo Valor
          <input type="number" />
          <button type="button">Atualizar</button>
        </label>
    </div>
  );
}

export default function Update() {
  const { getCurrency } = useContext(CryptoContext);

  useEffect(() => {
    getCurrency();
  }, []);

  return (
    <div>
      {CurrencyUpdateForm()}
    </div>
  );
}
