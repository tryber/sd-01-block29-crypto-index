import React, { useEffect, useState } from 'react';
// import fs from 'fs';
// import path from 'path';
// import util from 'util';

// const readFile = util.promisify(fs.readFile);

const currenciesJson = {
  BRL: '5.400',
  EUR: '0.920',
  CAD: '1.440',
};

function requestConfig(currency, valueCurrency) {
  return {
    method: 'POST',
    headers: {
      // Authorization: localStorage.token,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      currency,
      value: valueCurrency,
    }),
  };
}

async function getAPI(currency, valueCurrency, setErrorMessage) {
  try {
    const response = await fetch('http://localhost:3001/crypto/btc', requestConfig(currency, valueCurrency));
    const data = await response.json();

    if (data.message === 'Valor Alterado com sucesso') {
      setErrorMessage(data.message)
      return currenciesJson[currency] = valueCurrency;
    }

    return setErrorMessage(data.message);
  } catch (err) {
    console.log(err);
  }
}

// async function readFileCurrencies() {
//   const currenciesJson = await readFile(path.resolve(__dirname, '..', '..', 'api',
//      'currencies.json'), 'utf-8');
//   return Object.entries(JSON.parse(currenciesJson));
// }

function currencies(valueCurrency, setValueCurrency, currency, setCurrency, setErrorMessage) {
  const coins = Object.entries(currenciesJson);
  const objCoins = Object.fromEntries(coins);

  return (
    <section>
      <select onClick={e => setCurrency(e.target.value)}>
        {coins.map(coin => <option value={coin[0]}>{coin[0]}</option>)}
      </select>
      <p>
        Valor Atual: {objCoins[currency] || objCoins.BRL}
      </p>
      Novo Valor:
      <input type="number" onChange={e => setValueCurrency(e.target.value)} />
      <button type="button" onClick={() => getAPI(currency, valueCurrency, setErrorMessage)}>Atualizar</button>
    </section>
  );
}

function UpdateCoins() {
  const [valueCurrency, setValueCurrency] = useState();
  const [currency, setCurrency] = useState();
  const [data, setData] = useState();
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    setData(currencies(valueCurrency, setValueCurrency, currency, setCurrency, setErrorMessage));
  }, [valueCurrency, currency]);

  if (!data) return 'Loading...';
  return (
    <section>
      {data}
      <p>{errorMessage}</p>
    </section>
  );
}

export default UpdateCoins;
