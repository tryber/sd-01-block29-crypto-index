import React from 'react';
import useAxios from 'axios-hooks'
import './Home'


// const getSomeData = () =>
//   axios
//     .get('localhost:3001/cryto/btc')
//     .then(({ data }) => data)
//     .catch(err => console.error(err));

// function currents(data) {
  
//   data.map(values => (
//     <div>
//       <span id={values.bpi}>{values.bpi.code}</span>
//       <p>{parseFloat(values.bpi.rate.toFixed(2))}</p>
//     </div>
//   ));
// }

export default function Home() {
  const url = () => 'localhost:3001/cryto/btc'
  const [{ data, loading, error }, refetch] = useAxios(url())
  if (loading) return <p>Loading...</p>
  if (error) return <p>Error!</p>
  return (
    <section className="home">
      <button onClick={refetch}>Atualizar</button>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </section>
  );
}
