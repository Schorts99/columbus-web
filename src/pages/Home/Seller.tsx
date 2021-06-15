/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { listCheckouts } from '../../api';

export default function HomeSellerPage() {
  const { i18n } = useTranslation(['home']);
  const [loading, setLoading] = useState(true);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [checkouts, setCheckouts] = useState<Array<any>>([]);

  function fetchCheckouts() {
    setLoadingMore(true);
    listCheckouts({ page: currentPage + 1 })
      .then(async (res) => {
        const parsedBody = await res.json();

        if (res.ok) {
          const mergedData = parsedBody.data.map((checkout: any) => {
            const user = parsedBody.included.find((item: any) => item.id === checkout.relationships.user.data.id && item.type === 'users');
            // eslint-disable-next-line max-len
            const productIDS = checkout.relationships.checkout_products.data.map((item: any) => item.id);
            // eslint-disable-next-line camelcase
            const checkout_products = parsedBody.included.filter((item: any) => productIDS.includes(item.id) && item.type === 'checkout_products');

            return {
              id: checkout.id,
              ...checkout.attributes,
              user: {
                id: user.id,
                ...user.attributes,
              },
              checkout_products: checkout_products.map((item: any) => ({
                id: item.id,
                ...item.attributes,
              })),
            };
          });

          setCheckouts([...checkouts, ...mergedData]);

          if (parsedBody.data.length < 20) {
            setCanFetchMore(false);
          } else {
            setCurrentPage(currentPage + 1);
          }
        }
      })
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }

  useEffect(() => {
    fetchCheckouts();
  }, []);

  return (
    <div className="mt-16 grid grid-cols-12 mb-10">
      <div className="col-start-2 col-span-10">
        <table className="border border-gray-200 w-full">
          <thead>
            <tr className="text-left">
              <th className="w-1/4 border border-gray-200 px-3 py-2">
                Nombre
              </th>
              <th className="border border-gray-200 px-3 py-2">
                Productos
              </th>
              <th className="border border-gray-200 px-3 py-2">
                Total
              </th>
              <th className="border border-gray-200 px-3 py-2">
                Enviar a
              </th>
            </tr>
          </thead>
          <tbody>
            {checkouts.map((checkout) => (
              <tr className="text-left" key={checkout.id}>
                <th className="border border-gray-200 font-normal px-3 py-2">
                  {checkout.user.name}
                </th>
                <th className="border border-gray-200 font-normal px-3 py-2">
                  <ul>
                    {checkout.checkout_products.map((product: any) => (
                      <li key={product.id} className="flex justify-between">
                        {product.name}
                        <span className="font-bold">
                          x
                          {product.quantity}
                        </span>
                      </li>
                    ))}
                  </ul>
                </th>
                <th className="border border-gray-200 font-normal px-3 py-2">
                  {checkout.total.toLocaleString(i18n.language, {
                    style: 'currency',
                    currency: checkout.currency.toUpperCase(),
                  })}
                </th>
                <th className="border border-gray-200 font-normal px-3 py-2">
                  {checkout.shipment_address}
                </th>
              </tr>
            ))}
          </tbody>
        </table>
        {canFetchMore && !loading && (
          <div className="flex justify-center mt-8">
            <p
              className="text-gray-600 hover:text-black cursor-pointer"
              onClick={() => {
                if (!loadingMore) {
                  fetchCheckouts();
                }
              }}
            >
              Cargar más
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
