import React from 'react';
import './Inputs.css';

const setClass = (valid) => {
  if (valid) return 'isValid';
  return 'notValid';
}

const Inputs = (props) => {
  const { value: { id, type, label, disable = false } } = props
  const { value: { value, onChange, onClick, valid = true } } = props;
  const isValid = setClass(valid);
  return (
    <div className="Inputs">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onClick={onClick}
        className={isValid}
        disable={disable}
      />
    </div>
  );
};

export default Inputs;



