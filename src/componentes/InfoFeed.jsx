import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const InfoFeed = ({ info, isRefresh }) => (
  <div>
    <h2>{info}</h2>
    <input type="button" value="Novo valor?" onClick={isRefresh} />
    <Link to="/">
      Voltar
      </Link>
  </div>
);


export default InfoFeed;

InfoFeed.propTypes = {
  info: PropTypes.string.isRequired,
  isRefresh: PropTypes.func.isRequired,
};

