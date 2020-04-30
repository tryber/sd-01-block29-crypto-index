import React from 'react';
import ShowValue from './ShowValue';
import { Link } from "react-router-dom";

const formatDataCurrency = (data) => {
  console.log(data, 'currency')
  return Object.entries(data)
    .reduce((arr, currency) => {
      console.log(currency)
      arr.push(
        {
          type: currency[0],
          value: currency[1].rate,
        }
      )
      return arr;
    }, [])
};

const Currency = (props) => {
  const { data: { bpi } } = props;
  const arrayCurrency = formatDataCurrency(bpi);
  return (
    <div className="Currency">
      <Link to="/update">
        Atualizar valor monetário
      </Link>
      <div>
        {arrayCurrency.map(({ type, value }) => (
          <ShowValue name={type} value={value} />
        ))}
      </div>
    </div>
  );
};

export default Currency;
