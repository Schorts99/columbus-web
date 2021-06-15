import React from 'react';

type InputNumberProps = {
  value: number,
  onDecrease: any,
  onIncrease: any,
  disabled: boolean,
}

export default function InputNumber({
  value,
  onDecrease,
  onIncrease,
  disabled,
}: InputNumberProps) {
  return (
    <div className="grid grid-cols-3 items-center">
      <button disabled={disabled} type="button" onClick={onDecrease} className="px-4 py-1 border border-black">
        -
      </button>
      <p className="font-bold px-2 text-center">
        {value}
      </p>
      <button disabled={disabled} type="button" onClick={onIncrease} className="bg-black text-white px-4 py-1 border border-black">
        +
      </button>
    </div>
  );
}
