import React from 'react';

function currents(data) {
  data.map(values => (
    <div>
      <span id={values.bpi}>{values.bpi.code}</span>
      <p>{parseFloat(values.bpi.rate.toFixed(2))}</p>
    </div>
  ));
}

export default function Home() {
  return (
    <section className="home">
      <button type="button" className="button">
        Atualizar valor monetário
      </button>
    </section>
  );
}
