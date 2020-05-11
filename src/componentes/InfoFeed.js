import React from 'react';
import PropTypes from 'prop-types';

const InfoFeed = ({ info, setData }) => {
  setTimeout(() => {
    setData();
  }, 2000);
  return (
    <div>
      <h2>{info}</h2>
    </div>
  );
};

export default InfoFeed;

InfoFeed.propTypes = {
  info: PropTypes.string.isRequired,
  setData: PropTypes.func.isRequired,
};
