import React from 'react';

export interface FormInputProps extends HTMLInputElement {}

function FormInput({ id, defaultValue, type }: FormInputProps) {
  return (
    <input
      id={id}
      defaultValue={defaultValue}
      type={type}
      className="z-20 bg-layer-alt px-2 py-1 focus:shadow-md focus:shadow-blue12"
    />
  );
}

export default FormInput;
