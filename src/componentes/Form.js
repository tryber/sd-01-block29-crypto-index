import React from 'react';
import Inputs from '../componentes/Inputs';

const Form = (props) => {
  const { children } = props;
  return (
    <div>
      {children.map((value) => <Inputs key={value.id} value={value} />)}
    </div>
  );
};

export default Form;
