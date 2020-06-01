import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import ShowValue from './ShowValue';

const formatDataCurrency = (data, bitcoin) => (
  Object.entries(data)
    .reduce((arr, currency) => {
      arr.push(
        {
          type: currency[0],
          value: (currency[1].rate_float * bitcoin).toLocaleString('pt-BR'),
        },
      );
      return arr;
    }, [])
);

const Currency = (props) => {
  const { data: { bpi }, bitcoin } = props;
  const arrayCurrency = formatDataCurrency(bpi, bitcoin);
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

Currency.propTypes = {
  data: PropTypes.shape({
    bpi: PropTypes.shape({
      USD: PropTypes.shape({
        rate_float: PropTypes.number.isRequired,
      }),
    }),
  }).isRequired,
  bitcoin: PropTypes.number.isRequired,
};
