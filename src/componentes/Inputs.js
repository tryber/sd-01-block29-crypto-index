import React from 'react';
import './Inputs.css';

const setClass = (valid) => {
  if (valid) return 'isValid';
  return 'notValid';
}

const createButton = (attributes) => {
  const { id, type, value, disable, onClick } = attributes;
  return (
    <div className="Inputs btn-input">
      <input
        id={id}
        type={type}
        value={value}
        onClick={() => onClick()}
        disabled={disable}
      />
    </div>
  )
}

const createInput = (attributes) => {
  const { id, type, value, onChange, valid, label } = attributes;
  return (
    <div className="Inputs input">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={setClass(valid)}
      />
    </div>
  )
}

const createByType = (attributes) => {
  if (attributes.type === "button") return createButton(attributes);
  return createInput(attributes);
}

const Inputs = (props) => {
  const { attributes } = props

  return (
    createByType(attributes)
  );
}


export default Inputs;



