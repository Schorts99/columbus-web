import React from 'react';
import { useTranslation } from 'react-i18next';
import SEO from '../../components/SEO';
import Form from '../../components/Forms/SignIn';
import Banner from '../../components/Banner';

export default function SignInPage() {
  const { t } = useTranslation(['signIn', 'common']);

  return (
    <>
      <SEO title={t('title')} />
      <Banner t={t} image={{ alt: t('banner_alt'), src: '/images/signin_banner.svg' }}>
        <Form t={t} />
      </Banner>
    </>
  );
}
