import React, { useContext, useEffect, useState } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

const valuesIs = (currents, data) => (
  <span>
    <section className="home">{currents(data)}</section>
  </span>
);

const forms = (newValueBTC, setnewValueBTC) => (
  <form>
    <div>
      <input
        type="number"
        onChange={event => setnewValueBTC(event.target.value)}
        value={newValueBTC}
      />
      BTC
    </div>
  </form>
);

export default function Home() {
  const { data, fetchData } = useContext(BTCContext);
  const [newValueBTC, setnewValueBTC] = useState(1);
  if (newValueBTC <= 0) setnewValueBTC(1);
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
    arrayOfObject.pop();
    return arrayOfObject.map(({ code, rate_float }) => {
      const newValue = rate_float * Number(newValueBTC);
      const floatRateString = newValue.toLocaleString('en-US', {
        maximumSignificantDigits: 9,
      });
      return (
        <div>
          <span>{code}</span>
          <p>{floatRateString}</p>
        </div>
      );
    });
  };
  return (
    <div>
      {forms(newValueBTC, setnewValueBTC)}
      {valuesIs(currents, data, setnewValueBTC)}
    </div>
  );
}
