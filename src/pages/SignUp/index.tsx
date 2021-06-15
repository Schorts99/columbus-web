import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Form from '../../components/Forms/SignUp';
import Banner from '../../components/Banner';

export default function SignUpPage() {
  const { t } = useTranslation(['signUp', 'common']);

  return (
    <>
      <SEO title={t('title')} />
      <Banner t={t} image={{ alt: t('banner_alt'), src: '/images/signup_banner.svg' }}>
        <Form t={t} />
      </Banner>
    </>
  );
}
