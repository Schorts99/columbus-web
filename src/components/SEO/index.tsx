import React from 'react';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet';

type SEOProps = {
  title: string,
}

export default function SEO({ title }: SEOProps) {
  const { t } = useTranslation(['common']);

  return (
    <Helmet>
      <title>
        {title}
        {' '}
        -
        {' '}
        {t('brand')}
      </title>
    </Helmet>
  );
}
