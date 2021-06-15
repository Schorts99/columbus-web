import React, { useContext } from 'react';
import { useTranslation } from 'react-i18next';
import UserContext from '../../contexts/User';
import CustomerPage from './Customer';
import SellerPage from './Seller';
import SEO from '../../components/SEO';

export default function HomePage() {
  const { currentUser } = useContext(UserContext);
  const { t } = useTranslation(['home', 'common']);

  return (
    <>
      <SEO title={t('title')} />
      {currentUser?.role.name === 'seller' ? (
        <SellerPage />
      ) : <CustomerPage />}
    </>
  );
}
