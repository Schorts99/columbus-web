/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState, useContext } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { listAddresses, createCheckout } from '../../api';
import Address from '../Address';
import { AddressBaseType } from '../../types/Address';
import AddressForm from '../Forms/Address';
import Button from '../Button';
import CartContext from '../../contexts/Cart';
import useNotify from '../../hooks/useNotify.js';

export default function Payment() {
  const history = useHistory();
  const notify = useNotify();
  const { t, i18n } = useTranslation(['common']);
  const [addresses, setAddresses] = useState<Array<AddressBaseType>>([]);
  const [addAddress, setAddAddress] = useState(false);
  const [loading, setLoading] = useState(true);
  const [selectedAddress, setSelectedAddress] = useState<string | null>(null);
  const { cart, cartDispatch } = useContext(CartContext);

  function fetchAddresses() {
    listAddresses()
      .then(async (res) => {
        const parsedBody = await res.json();

        setAddresses(parsedBody.data);
        setSelectedAddress(parsedBody.data[0]?.id);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    fetchAddresses();
  }, []);

  function pay() {
    if (selectedAddress) {
      createCheckout({ address_id: selectedAddress })
        .then(async (res) => {
          if (res.ok) {
            cartDispatch({ type: 'RESET' });
            history.push('/success');
          } else {
            const parsedBody = await res.json();

            notify('error', parsedBody.errors[0].detail);
          }
        });
    } else {
      notify('error', t('add_address_first'));
    }
  }

  return (
    <div
      className="shadow rounded px-3 py-2"
      style={{ height: 'fit-content' }}
    >
      <h2 className="text-lg font-bold mb-2">
        {t('address')}
      </h2>
      {!addAddress && addresses.map((address) => (
        <Address
          key={address.id}
          {...address.attributes}
          selected={selectedAddress === address.id}
          select={() => setSelectedAddress(address.id)}
        />
      ))}
      {addAddress && (
        <AddressForm
          cancel={() => setAddAddress(false)}
          onSuccess={fetchAddresses}
        />
      )}
      {addresses.length < 3 && !addAddress && !loading && (
        <div className="flex justify-end">
          <p className="text-gray-800 cursor-pointer" onClick={() => setAddAddress(true)}>
            {t('add_address')}
          </p>
        </div>
      )}
      {!addAddress && (
        <div className="mt-5">
          <Button
            onClick={pay}
            label={`${t('pay')}: ${cart?.total.toLocaleString(i18n.language, {
              style: 'currency',
              currency: cart?.currency,
            })}`}
          />
        </div>
      )}
    </div>
  );
}
