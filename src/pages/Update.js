import React, { useState } from 'react';
import axios from 'axios';
import Form from '../componentes/Form';
import InfoFeed from '../componentes/InfoFeed';
import Loading from '../componentes/Loading';
import { getItemToken } from './localStorageApi';
import ShowCoinValue from '../componentes/ShowCoinValue';

const sendCurrency = (currency, value, objFetch) => {
  const { setIsLoading, isLoading, data, setData } = objFetch;
  if (!isLoading && !data) {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://localhost:3001/crypto/btc',
      headers: {
        authorization: getItemToken(),
      },
      data: {
        currency,
        value,
      },
    }).then((resp) => {
      setData(resp.data.message);
      setIsLoading(false);
    }).catch((err) => {
      setData(err.response.data.message);
      setIsLoading(false);
    });
  }
};

const verifyCurrencies = currency => ['BRL', 'EUR', 'CAD'].includes(currency);

const verifyValue = value => (
  (Number.isInteger(Number(value)) && value > 0)
);

const verifyData = (currency, value) => (
  (verifyCurrencies(currency) && verifyValue(value))
);

const createObj = (obj) => {
  const { currency, value, setCurrency, setValue } = obj;
  const { isLoading, setIsLoading, data, setData } = obj;
  const objFetch = { isLoading, setIsLoading, data, setData };
  return [{
    label: 'Moeda',
    type: 'select',
    options: ['BRL', 'EUR', 'CAD'],
    value: currency,
    onChange: valueCurrency => setCurrency(valueCurrency),
  },
  {
    label: 'Valor',
    type: 'number',
    value,
    onChange: val => setValue(val),
    valid: verifyValue(value),
  },
  {
    type: 'button',
    value: 'Atualizar',
    onClick: () => sendCurrency(currency, value, objFetch),
    disable: !verifyData(currency, value),
  }];
};

const Update = () => {
  const [currency, setCurrency] = useState('BRL');
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState();
  let obj = { currency, value, setCurrency, setValue };
  obj = { ...obj, ...{ isLoading, setIsLoading, data, setData } };

  if (isLoading) return <Loading />;
  return (
    <div>
      {data &&
        <InfoFeed info={data} setData={() => setData()} />
      }
      <ShowCoinValue coin={currency} />
      <Form>{createObj(obj)}</Form>
    </div>
  );
};

export default Update;
