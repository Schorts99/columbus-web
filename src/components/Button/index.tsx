import React from 'react';
import Loader from 'react-loader-spinner';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

type ButtonProps = {
  to?: string,
  submit?: boolean,
  label: string,
  onClick?: any,
  loading?: boolean,
  invert?: boolean,
}

export default function Button({
  to,
  submit,
  label,
  onClick,
  loading,
  invert,
}: ButtonProps) {
  const buttonClass = classnames({
    'py-3 uppercase rounded w-full light-shadow font-bold flex justify-center': true,
    'transition duration-500 ease-in-out': !loading,
    'hover:bg-black bg-gray-800 text-white': !invert,
    'hover:bg-white bg-gray-200': invert,
    'bg-gray-600': loading,
  });

  if (to) {
    return (
      <Link to={to} className={buttonClass} onClick={onClick}>
        {label}
      </Link>
    );
  }

  return (
    <button
      className={buttonClass}
      type={submit ? 'submit' : 'button'}
      onClick={onClick}
      disabled={loading}
    >
      {loading ? (
        <Loader
          type="Bars"
          color={invert ? '#1F2937' : '#E5E7EB'}
          height={25}
        />
      ) : label}
    </button>
  );
}

Button.defaultProps = {
  to: null,
  submit: false,
  onClick: () => {},
  loading: false,
  invert: false,
};
