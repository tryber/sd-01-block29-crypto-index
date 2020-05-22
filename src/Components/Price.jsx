import React, { useContext } from 'react';
// import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';
import './Price.css';

export default function Price() {
  const { data } = useContext(BTCContext);
  const { bpi } = data;

  const seletion = value => {
    const newObject = Object.entries(value);
    const arrayOfObject = [];
    newObject.map(list => {
      const valueInsideOne = list[1];
      return arrayOfObject.push(valueInsideOne);
    });
    return arrayOfObject.map(options => (
      <option value={options.rate_float}>{options.code}</option>
    ));
  };

  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select>{seletion(bpi)}</select>
      <span>
        Valor Atual: R{bpi.BRL.symbol}
        {bpi.BRL.rate_float}
      </span>
      <label htmlFor="">Novo valor</label>
      <input type="number" />
      <button className="atualizar">ATUALIZAR</button>
    </div>
  );
}
