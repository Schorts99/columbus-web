import React from 'react';
import { useTranslation } from 'react-i18next';
import Button from '../Button';

export default function EmptyCart() {
  const { t } = useTranslation(['common']);

  return (
    <div className="flex justify-center">
      <div className="w-full md:w-1/2">
        <h2 className="text-center mb-3 text-xl font-bold">
          {t('empty_cart')}
        </h2>
        <Button label={t('go_home')} to="/" />
      </div>
    </div>
  );
}
