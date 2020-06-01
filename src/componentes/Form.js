import React from 'react';
import PropTypes from 'prop-types';
import Inputs from './Inputs';

const Form = (props) => {
  const { children } = props;
  return (
    <div>
      {children.map(value => <Inputs key={value.id} attributes={value} />)}
    </div>
  );
};

export default Form;

Form.propTypes = {
  children: PropTypes.node.isRequired,
};
