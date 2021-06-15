import React from 'react';
import classnames from 'classnames';

type InputProps = {
  label: string,
  required?: boolean,
  name: string,
  autoComplete?: string,
  disabled?: boolean,
  maxLength?: number,
  minLength?: number,
  placeholder: string,
  type?: string,
  value: string,
  onChange: any,
  rows?: number,
  error?: string | null,
  min?: number,
  max?: number,
}

export default function Input({
  label,
  required,
  name,
  autoComplete,
  disabled,
  maxLength,
  minLength,
  placeholder,
  type,
  value,
  onChange,
  rows,
  error,
  min,
  max,
} : InputProps) {
  const
    labelClass = classnames({
      'text-sm': true,
      'text-gray-600': !error,
      'text-red-600': error,
    });
  const inputClass = classnames({
    'w-full mt-2 p-2 border rounded text-lg text-black': true,
    'mb-3 border-gray-600': !error,
    'border-red-600': error,
  });

  return (
    <label className={labelClass} htmlFor={name}>
      {required ? '* ' : ''}
      {label}
      {rows && rows > 1 ? (
        <textarea
          className={inputClass}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          rows={rows}
          value={value}
          onChange={onChange}
        />
      ) : (
        <input
          className={inputClass}
          name={name}
          autoComplete={autoComplete}
          disabled={disabled}
          maxLength={maxLength}
          minLength={minLength}
          placeholder={placeholder}
          type={type}
          value={value}
          onChange={onChange}
          min={min}
          max={max}
        />
      )}
      {error && (
        <p className="my-2 text-red-600">
          {error}
        </p>
      )}
    </label>
  );
}

Input.defaultProps = {
  required: false,
  autoComplete: 'off',
  disabled: false,
  maxLength: 180,
  minLength: 0,
  type: 'text',
  rows: 1,
  error: null,
  min: 0,
  max: undefined,
};
