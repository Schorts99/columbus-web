import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';
import CartContext from '../../contexts/Cart';
import { addProductToCart } from '../../api';
import useNotify from '../../hooks/useNotify.js';

type ProductProps = {
  id: string,
  name: string,
  description: string,
  cover: {
    path: string,
  },
  price: number,
}

export default function Product({
  id,
  name,
  description,
  cover,
  price,
}: ProductProps) {
  const notify = useNotify();
  const { t, i18n } = useTranslation(['common']);
  const { cartDispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(false);

  function addProductToCartHandler() {
    setLoading(true);
    addProductToCart({ id, increase: true })
      .then(async (res) => {
        if (res.ok) {
          cartDispatch({ type: 'INCREASE_COUNT', price });
        } else {
          const parsedBody = await res.json();
          notify('error', parsedBody.errors[0].detail);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="relative product cursor-pointer">
      <img
        src={cover.path}
        alt={name}
        draggable={false}
        className="transition duration-500 ease-in-out"
      />
      <div className="absolute top-0 w-full h-full opacity-0 transition duration-500 ease-in-out flex justify-center items-center p-10">
        <div>
          <h3 className="text-white font-bold text-xl">
            {name}
          </h3>
          <div className="bg-white h-2 w-10 my-2 rounded-full" />
          <p className="text-gray-200 mb-5">
            {description}
          </p>
          <p className="mb-5 font-bold text-white">
            {price.toLocaleString(i18n.language, {
              style: 'currency',
              currency: i18n.language === 'en-US' ? 'USD' : 'MXN',
            })}
          </p>
          <Button invert loading={loading} label={t('add')} onClick={addProductToCartHandler} />
        </div>
      </div>
      <style>
        {`
        .product:hover img {
          filter: brightness(40%);
        }
        .product:hover div {
          opacity: 1;
        }
      `}
      </style>
    </div>
  );
}
