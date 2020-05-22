import React, { useContext, useEffect, useState } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

const seletion = currency => {
  const list = ['BRL', 'EUR', 'CAD'];
  return list.map(options => {
    return (
      <option value={options} selected={options === currency}>
        {options}
      </option>
    );
  });
};

export default function Price() {
  const {
    read,
    write,
    setWrite,
    currency,
    setCurrency,
    handleSubmit,
    fetchDataGet,
  } = useContext(BTCContext);

  useEffect(() => {
    fetchDataGet();
  }, []);

  if (!read) {
    return <AwesomeComponent />;
  }
  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select onChange={e => setCurrency(e.target.value)}>
        {seletion(currency)}
      </select>
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
