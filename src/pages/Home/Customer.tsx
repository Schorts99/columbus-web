/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Placeholder from '../../components/Product/Placeholder';
import { listProducts } from '../../api';
import Error from '../../components/Error';
import Product from '../../components/Product';
import { ProductBaseType } from '../../types/Product';

export default function HomeCustomerPage() {
  const { t } = useTranslation(['home']);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [products, setProducts] = useState<Array<ProductBaseType>>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [canFetchMore, setCanFetchMore] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);

  function fetchData() {
    setLoadingMore(true);
    listProducts({ page: currentPage + 1 })
      .then(async (res) => {
        const parsedBody = await res.json();

        if (res.ok) {
          const mergedData = parsedBody.data.map((product: any) => ({
            ...product,
            attributes: {
              ...product.attributes,
              // eslint-disable-next-line max-len
              cover: parsedBody.included.find((cover: any) => cover.id === product.relationships.cover.data.id).attributes,
            },
          }));

          setProducts([...products, ...mergedData]);

          if (parsedBody.data.length < 20) {
            setCanFetchMore(false);
          } else {
            setCurrentPage(currentPage + 1);
          }
        } else {
          setError(true);
        }
      })
      .catch(() => setError(true))
      .finally(() => {
        setLoading(false);
        setLoadingMore(false);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mt-16 grid grid-cols-12 mb-10">
      <div className="col-start-2 col-span-10">
        {(!error && loading) || !loading ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-5 divide-x-2 divide-y-2 divide-white">
              {loading ? [1, 2, 3, 4, 5, 6].map((index) => (
                <Placeholder key={index} />
              )) : products.map((product) => (
                <Product key={product.id} id={product.id} {...product.attributes} />
              ))}
            </div>
            {canFetchMore && !loading && (
              <div className="flex justify-center mt-8">
                <p
                  className="text-gray-600 hover:text-black cursor-pointer"
                  onClick={() => {
                    if (!loadingMore) {
                      fetchData();
                    }
                  }}
                >
                  {t('load_more')}
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="md:w-1/2 mx-auto mt-20">
            <Error title={t('error')} retry={fetchData} />
          </div>
        )}
      </div>
    </div>
  );
}
