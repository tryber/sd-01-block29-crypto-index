import React, { useContext, useEffect } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

const seletion = (currency) => {
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

export default function Price() {
  const { read, write, setWrite, currency, setCurrency, handleSubmit, fetchDataGet,
  } = useContext(BTCContext);
  useEffect(() => {
    fetchDataGet();
  }, []);
  if (!read) return <AwesomeComponent />;
  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select onChange={e => setCurrency(e.target.value)}>
        {seletion(currency)}
      </select>
      <span>Valor Atual: R${read.bpi[currency].rate}</span>
      <p>Novo valor</p>
      {input(write, setWrite)}
      {btn(handleSubmit, write)}
    </div>
  );
}
