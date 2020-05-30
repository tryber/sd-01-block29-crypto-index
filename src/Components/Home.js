import React, { useContext, useState } from 'react';
import AwesomeComponent from './AwesomeComponent';
import { BTCContext } from '../context/BTCContext';

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

const currents = ({ bpi }, newValueBTC) => {
  const newObject = Object.entries(bpi);
  const arrayOfObject = [];
  newObject.map(list => {
    const valueInsideOne = list[1];
    return arrayOfObject.push(valueInsideOne);
  });
  arrayOfObject.pop();
  return arrayOfObject.map(({ code, rate_float: rateFloat }) => {
    const newValue = rateFloat * Number(newValueBTC);
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

export default function Home() {
  const { data } = useContext(BTCContext);
  const [newValueBTC, setnewValueBTC] = useState(1);
  if (newValueBTC <= 0) setnewValueBTC(1);
  if (!data) return <AwesomeComponent />;
  return (
    <div>
      {forms(newValueBTC, setnewValueBTC)}
      <span>
        <section className="home">{currents(data, newValueBTC)}</section>
      </span>
    </div>
  );
}
