import React from 'react';
import './Price.css';
import {fileModifier, parseF} from '../../service/functions'

export default function Price() {
  function seletion(data) {
    return data.map(options => (
      <option value={options.rate_float}>{options.code}</option>
    ));
  }
  const read = await fileModifier('read');
  const { BRL } = read;
  return (
    <div className="containerPrice">
      <button>voltar</button>
      <h2>Moeda</h2>
      <select>{seletion(data)}</select>
      <span>Valor Atual: R{data.bpi.BRL.symbol}{parseF(BRL, 2)}</span>
      <label htmlFor="">Novo valor</label>
      <input type="number"/>
      <button className="atualizar">ATUALIZAR</button>
    </div>
  );
}
