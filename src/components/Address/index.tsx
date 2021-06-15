/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
// eslint-disable-next-line import/no-unresolved
import { AiFillCheckCircle } from 'react-icons/ai';

type AddressProps = {
  name: string,
  address: string,
  state: string,
  selected: boolean,
  select: any,
}

export default function Address({
  name,
  address,
  state,
  selected,
  select,
}: AddressProps) {
  return (
    <div
      className="mb-2 flex justify-between items-center cursor-pointer"
      onClick={select}
    >
      <div>
        <h3 className="font-bold">
          {name}
        </h3>
        <p className="text-sm text-gray-600">
          {address}
          {', '}
          {state}
        </p>
      </div>
      {selected && (
        <AiFillCheckCircle size="1.7em" />
      )}
    </div>
  );
}
