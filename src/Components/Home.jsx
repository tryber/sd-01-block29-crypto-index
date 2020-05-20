import React, { useState, useEffect } from 'react';
import AwesomeComponent from './AwesomeComponent';
import './Home';

export default function Home() {
  const [data, setData] = useState(null);

  const currents = ({ bpi }) => {
    const newObject = Object.entries(bpi);
    const arrayOfObject = [];
    newObject.map(list => {
      const valueInsideOne = list[1];
      arrayOfObject.push(valueInsideOne);
    });
    return arrayOfObject.map(({ code, rate }) => (
      <div>
        <span>{code}</span>
        <p>{rate}</p>
      </div>
    ));
  };

  const fetchData = async () => {
    const URL = 'http://localhost:3001/cryto/btc';
    const tokens = localStorage.getItem('token');
    const configurations = {
      headers: { authorization: tokens, 'Content-Type': 'application/json' },
    };
    await fetch(URL, configurations)
      .then(response => response.json())
      .then(({ data }) => setData(data));
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (data === null) {
    return <AwesomeComponent />;
  }

  return (
    <section className="home">
      <h1>carregou</h1>
      {currents(data)}
    </section>
  );
}
