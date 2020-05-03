import React from 'react';
import PropTypes from 'prop-types';
import './Inputs.css';

const setClass = (valid) => {
  if (valid) return 'isValid';
  return 'notValid';
};

const Option = ({ optionValue, value }) => (
  <option
    selected={value === optionValue}
    value={optionValue}
  >
    {optionValue}
  </option>
);

const Select = ({ attributes }) => {
  const { id = 'inputSelect', label, options } = attributes;
  const { value, onChange } = attributes;
  return (
    <div className="Inputs select-input">
      <label htmlFor={id}>{label}</label>
      <select id={id} onChange={e => onChange(e.target.value)}>
        {options.map(option => (
          <Option key={option} optionValue={option} value={value} />
        ))}
      </select>
    </div>
  );
};

const Button = ({ attributes }) => {
  const { id = 'inputButton', type, value, disable, onClick } = attributes;
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
  );
};

const Input = ({ attributes }) => {
  const { id = 'inputText', type, value, onChange, valid, label } = attributes;
  return (
    <div className="Inputs input">
      <label htmlFor={id}>
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        className={setClass(valid)}
      />
    </div>
  );
};

const createByType = (attributes) => {
  if (attributes.type === 'button') return <Button attributes={attributes} />;
  if (attributes.type === 'select') return <Select attributes={attributes} />;
  return <Input attributes={attributes} />;
};

const Inputs = (props) => {
  const { attributes } = props;
  return (
    createByType(attributes)
  );
};

export default Inputs;

Inputs.propTypes = {
  attributes: PropTypes.shape({

  }),
};
