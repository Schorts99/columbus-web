import React from 'react';
import Loader from 'react-loader-spinner';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';

export default function LoadingPage() {
  const { t } = useTranslation(['loading']);

  return (
    <>
      <SEO title={t('title')} />
      <div className="h-screen flex justify-center items-center">
        <div>
          <h1 className="text-xl md:text-2xl">
            {t('common:brand')}
          </h1>
          <div className="flex justify-center mt-2">
            <Loader
              type="Bars"
              color="#000000"
              height={30}
              width={30}
            />
          </div>
        </div>
      </div>
    </>
  );
}
