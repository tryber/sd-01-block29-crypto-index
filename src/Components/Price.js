import React, { useContext, useState } from 'react';
import axios from 'axios';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

const seletion = currency => {
  const list = ['BRL', 'EUR', 'CAD'];
  return list.map(options => (
    <option value={options} selected={options === currency}>
      {options}
    </option>
  ));
};

const input = (write, setWrite) => (
  <input
    type="number"
    value={write}
    required
    onChange={e => setWrite(e.target.value)}
  />
);

const btn = (handleSubmit, write) => (
  <button className="atualizar" onClick={handleSubmit} disabled={!write}>
    ATUALIZAR
  </button>
);

const body = {
  currency,
  value: Number(write),
};

const URL = 'http://localhost:3001/crypto/btc';
const tokens = localStorage.getItem('token');
const configurations = {
  headers: { authorization: tokens, 'Content-Type': 'application/json' },
};

export default function Price() {
  const { data, setUpdate } = useContext(BTCContext);
  const [currency, setCurrency] = useState('BRL');
  const [write, setWrite] = useState();
  const handleSubmit = async () => {
    axios.post(URL, body, configurations);
    setUpdate(true);
  };
  if (!data) return <AwesomeComponent />;
  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select onChange={e => setCurrency(e.target.value)}>
        {seletion(currency)}
      </select>
      <span>Valor Atual: R${data.bpi[currency].rate}</span>
      <p>Novo valor</p>
      {input(write, setWrite)}
      {btn(handleSubmit, write)}
    </div>
  );
}
