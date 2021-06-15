/* eslint-disable react/self-closing-comp */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Product from '../../components/Product/Cart';
import { listCartProducts } from '../../api';
import Placeholder from '../../components/Product/Cart/Placeholder';
import Payment from '../../components/Payment';
import Empty from '../../components/Empty/Cart';

export default function CartPage() {
  const { t } = useTranslation(['cart']);
  const [products, setProducts] = useState<Array<any>>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    listCartProducts()
      .then(async (res) => {
        const parsedBody = await res.json();
        const mergedData = parsedBody.data.map((cartProduct: any) => {
          const product = parsedBody.included.find((item: any) => item.id === cartProduct.relationships.product.data.id && item.type === 'products');
          const cover = parsedBody.included.find((item: any) => item.id === product.relationships.cover.data.id && item.type === 'images');

          return {
            ...cartProduct,
            attributes: {
              ...cartProduct.attributes,
              product: {
                ...product,
                cover: cover.attributes,
              },
            },
          };
        });

        setProducts(mergedData);
      })
      .finally(() => setLoading(false));
  }, []);

  function removeItemFromCart(id: string) {
    const newProducts = products.filter((product) => product.attributes.product.id !== id);

    setProducts(newProducts);
  }

  return (
    <>
      <SEO title={t('title')} />
      <div className="mt-16 grid grid-cols-12 mb-10">
        <div className="col-start-2 col-span-10">
          {products.length || loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="order-1 md:order-none">
                {loading ? [1, 2, 3, 4, 5].map((index) => (
                  <Placeholder key={index} />
                )) : products.map((product) => (
                  <Product
                    key={product.id}
                    id={product.id}
                    {...product.attributes}
                    {...product.attributes.product}
                    {...product.attributes.product.attributes}
                    removeItem={removeItemFromCart}
                  />
                ))}
              </div>
              <Payment />
            </div>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  );
}
