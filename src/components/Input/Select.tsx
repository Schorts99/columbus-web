/* eslint-disable react/no-array-index-key */
import React from 'react';
import classnames from 'classnames';

type SelectOption = {
  value: string,
  label: string
}

type SelectInputProps = {
  label: string,
  disabled?: boolean,
  name: string,
  onChange: any,
  error?: string | null,
  value: string,
  options: Array<SelectOption>,
  placeholder: string,
  required?: boolean,
}

export default function SelectInput({
  label,
  disabled,
  name,
  onChange,
  error,
  value,
  options,
  placeholder,
  required,
} : SelectInputProps) {
  const
    selectClass = classnames({
      'bg-white text-black mt-2 border rounded flex w-full p-2 text-lg': true,
      'bg-opacity-30': disabled,
      'border-gray-600 mb-3': !error,
      'border-red-600': error,
    });
  const labelClass = classnames({
    'text-sm': true,
    'text-gray-600': !error,
    'text-red-600': error,
  });

  return (
    <label className={labelClass} htmlFor={name}>
      {required ? '* ' : ''}
      {label}
      <select
        name={name}
        value={value}
        onChange={onChange}
        className={selectClass}
        disabled={disabled}
      >
        {placeholder && (
          <option value="">
            {placeholder}
          </option>
        )}
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className="my-2 text-red-600">
          {error}
        </p>
      )}
    </label>
  );
}

SelectInput.defaultProps = {
  disabled: false,
  error: null,
  required: false,
};
