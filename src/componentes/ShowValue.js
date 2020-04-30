import React from 'react';
import PropTypes from 'prop-types';

const ShowValue = (props) => {
  const { name, value } = props;
  return (
    <div className="ShowValue">
      <h2>{name}</h2>
      <div>{value}</div>
    </div>
  );
};

export default ShowValue;
