import React, { useContext, useEffect } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

import './Home.css';

export default function Home() {
  const { data, fetchData } = useContext(BTCContext);

  useEffect(() => {
    fetchData();
  }, []);

  if (!data) return <AwesomeComponent />;

  const currents = ({ bpi }) => {
    const newObject = Object.entries(bpi);
    const arrayOfObject = [];
    newObject.map(list => {
      const valueInsideOne = list[1];
      return arrayOfObject.push(valueInsideOne);
    });
    return arrayOfObject.map(({ code, rate }) => (
      <div>
        <span>{code}</span>
        <p>{rate}</p>
      </div>
    ));
  };

  return (
    <span>
      <button onClick={() => window.location.reload(false)}>
        {' '}
        Atualizar valor monetário{' '}
      </button>
      <section className="home">{currents(data)}</section>
    </span>
  );
}
