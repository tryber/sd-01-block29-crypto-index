import React from 'react';
import { useContext, useEffect } from 'react';
import axios from 'axios';
import { CryptoContext } from '../context/CryptoContext';
import { getLocalStorage } from '../services/services';

function changeCurrencyValue(selectedCoin, changeValueCurrency) {
  axios.post('http://localhost:3001/crypto/btc',
    {
      currency: selectedCoin,
      value: changeValueCurrency
    },
    {
      headers: {
        Authorization: getLocalStorage(),
      },
    })
    .then((data) => {
      if (data.message === 'Valor alterado com sucesso!')
        console.log(data.message);
    })
    .catch(err => console.log(err))
}

function CurrencyUpdateForm() {
  const {
    changeValueCurrency,
    selectedCoin,
    setSelectedCoin,
    currentCurrencyValue,
    setChangeValueCurrency
  } = useContext(CryptoContext);

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
      <span>Valor Atual: {`${currentCurrencyValue[selectedCoin]}`} </span><br />
      <label>
        Novo Valor
          <input type="number" onChange={(event) => setChangeValueCurrency(event.target.value)} />
        <button
          type="button"
          onClick={() => changeCurrencyValue(selectedCoin, changeValueCurrency)}
        >
          Atualizar
        </button>
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
