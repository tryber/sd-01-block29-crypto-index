import React, { useContext, useEffect } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';
import axios from 'axios';
import './Home.css';

export default function Home() {
  
  const { data, setData } = useContext(BTCContext);

  const fetchData = async () => {
    const URL = 'http://localhost:3001/cryto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    return axios
      .get(URL, configurations)
      .then(({ data }) => setData(data.data))
      .catch(error => setData(error));
  };

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
    <>
      <button onClick={() => window.location.reload(false)}>
        {' '}
        Atualizar valor monetário{' '}
      </button>
      <section className="home">{currents(data)}</section>
    </>
  );
}
