import React from 'react';

function FormInput({ id, defaultValue, type }) {
  return (
    <input
      id={id}
      defaultValue={defaultValue}
      type={type}
      className="z-20 px-2 py-1 border border-gray-400 hover:border-gray-600 focus:outline-blue-600 focus:shadow-md focus:shadow-blue-200"
    />
  );
}

export default FormInput;

// @@@style
