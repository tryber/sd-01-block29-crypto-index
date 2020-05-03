import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Form from '../componentes/Form';
import InfoFeed from '../componentes/InfoFeed';
import Loading from '../componentes/Loading';

const sendCurrency = (currency, value, { setIsLoading, isLoading, data, setData }) => {
  if (!isLoading && data === '') {
    setIsLoading(true);
    axios({
      method: 'post',
      url: 'http://localhost:3005/crypto/btc',
      headers: {
        authorization: localStorage.getItem("token"),
      },
      data: {
        currency,
        value,
      }
    }).then(resp => {
      setData(resp.data.message)
      setIsLoading(false);
    }).catch((err) => {
      setData(err.response.data.message)
      setIsLoading(false);
    })
  }
}

const verifyCurrencies = (currency) => ['BRL', 'EUR', 'CAD'].includes(currency);

const verifyValue = (value) => {
  return (Number.isInteger(Number(value)) && value !== 0)
};

const verifyData = (currency, value) => {
  return (verifyCurrencies(currency) && verifyValue(value))
}

const Update = () => {
  const [currency, setCurrency] = useState('BRL');
  const [value, setValue] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);

  const objInputs = [
    {
      id: "inputSelect",
      label: "Moeda",
      type: "select",
      options: ['BRL', 'EUR', 'CAD'],
      value: currency,
      onChange: (valueCurrency) => setCurrency(valueCurrency),
    },
    {
      id: "inputValue",
      label: "Valor:",
      type: "number",
      value: value,
      onChange: (value) => setValue(value),
      valid: verifyValue(value),
    },
    {
      id: "btnLogin",
      type: "button",
      value: "Atualizar",
      onClick: () => sendCurrency(
        currency,
        value,
        { isLoading, setIsLoading, data, setData }
      ),
      disable: !verifyData(currency, value),
    },
  ];

  useEffect(() => {
    if (isRefresh)
      console.log('aaaaaa')
    setData('');
    setValue(0);
    setIsLoading(false);
    setCurrency('BRL');
    setIsRefresh(false);
  }, [isRefresh])

  if (isLoading) return <Loading />

  return (
    <div>
      {
        data !== '' &&
        <InfoFeed
          info={data}
          isRefresh={() => setIsRefresh(true)}
        />
      }
      <Form>
        {objInputs}
      </Form>
    </div>
  );
};

export default Update;
