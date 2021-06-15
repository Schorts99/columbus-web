import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import SEO from '../../components/SEO';

export default function SuccessPage() {
  const { t } = useTranslation(['success']);
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push('/');
    }, 3000);
  }, []);

  return (
    <>
      <SEO title={t('title')} />
      <div className="mt-16 grid grid-cols-12 mb-10">
        <div className="col-start-2 col-span-10">
          <div className="flex justify-center">
            <div className="w-full md:w-1/2">
              <h1 className="text-center font-bold text-2xl mb-3">
                {t('thanks')}
              </h1>
              <img
                src={`${process.env.PUBLIC_URL}/images/success_banner.svg`}
                alt={t('success')}
                className="mb-5"
              />
              <p className="text-center text-sm text-gray-600">
                {t('redirected')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
