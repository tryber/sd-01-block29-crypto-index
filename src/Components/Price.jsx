import React, { useContext, useEffect, useState } from 'react';
import AwesomeComponent from './AwesomeComponent';
import axios from 'axios';
import { BTCContext } from '../context/BTCContext';

export default function Price() {
  const { read, setRead, write, setWrite, currency, setCurrency } = useContext(BTCContext);
  

  const fetchDataGet = async () => {
    const URL = 'http://localhost:3001/cryto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    return axios
      .get(URL, configurations)
      .then(({ data }) => {
        setRead(data.data);
      })
      .catch(error => setRead(error));
  };

  const handleSubmit = async () => {
    const URL = 'http://localhost:3001/cryto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };

    const body = {
      currency,
      "value": Number(write) 
    };

    console.log('body', body);
    return axios
      .post(URL, body, configurations)
      .then(({ data }) => console.log('data', data))
      .catch(err => console.log(err.response.data.message));
  };

  useEffect(() => {
    fetchDataGet();
  }, []);

  const seletion = () => {
    const list = ['BRL', 'EUR', 'CAD'];
    return list.map(options => {
      return (
        <option value={options} selected={options === currency}>
          {options}
        </option>
      );
    });
  };

  if (!read) {
    return <AwesomeComponent />;
  }
  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select onChange={e => setCurrency(e.target.value)}>{seletion()}</select>
      <span>Valor Atual: R${read.bpi[currency].rate}</span>
      <label htmlFor="">Novo valor</label>
      <input
        type="number"
        value={write}
        required
        onChange={e => setWrite(e.target.value)}
      />
      <button className="atualizar" onClick={handleSubmit} disabled={!write}>
        ATUALIZAR
      </button>
    </div>
  );
}
