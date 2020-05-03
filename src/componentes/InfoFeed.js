import React from 'react';
import { Link } from 'react-router-dom'

const InfoFeed = ({ info, isRefresh }) => {
  return (
    <div>
      <h2>{info}</h2>
      <input type="button" value="Novo valor?" onClick={isRefresh} />
      <Link to="/">
        Voltar
      </Link>
    </div>
  );
};

export default InfoFeed;
