import React, { useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import CartContext from '../../../contexts/Cart';
import { addProductToCart } from '../../../api';
import useNotify from '../../../hooks/useNotify.js';
import NumberInput from '../../Input/Number';

type ProductProps = {
  id: string,
  name: string,
  cover: {
    path: string,
  },
  price: number,
  quantity: number,
  removeItem: Function,
}

export default function Product({
  id,
  name,
  cover,
  price,
  quantity: apiQuantity,
  removeItem,
}: ProductProps) {
  const notify = useNotify();
  const { i18n } = useTranslation(['common']);
  const { cartDispatch } = useContext(CartContext);
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(apiQuantity);

  function addProductToCartHandler(increase: boolean) {
    setLoading(true);
    addProductToCart({ id, increase })
      .then(async (res) => {
        if (res.ok) {
          const newQuantity = quantity + (increase ? 1 : -1);

          cartDispatch({ type: increase ? 'INCREASE_COUNT' : 'DECREASE_COUNT', price });

          if (newQuantity > 0) {
            setQuantity(newQuantity);
          } else {
            removeItem(id);
          }
        } else {
          const parsedBody = await res.json();
          notify('error', parsedBody.errors[0].detail);
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <div className="flex mb-3 shadow rounded">
      <img
        src={cover.path}
        alt={name}
        draggable={false}
        className="w-32 rounded-l"
      />
      <div className="px-3 py-2 w-full flex flex-col justify-between">
        <div>
          <h3 className="mb-1">
            {name}
          </h3>
          <p className="font-bold text-sm">
            {price.toLocaleString(i18n.language, {
              style: 'currency',
              currency: i18n.language === 'en-US' ? 'USD' : 'MXN',
            })}
          </p>
        </div>
        <div className="flex justify-end">
          <NumberInput
            disabled={loading}
            onIncrease={() => addProductToCartHandler(true)}
            onDecrease={() => addProductToCartHandler(false)}
            value={quantity}
          />
        </div>
      </div>
    </div>
  );
}
