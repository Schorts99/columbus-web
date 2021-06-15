import React, { ReactNode } from 'react';
import Header from '../components/Header';
import { CartProvider } from '../contexts/Cart';

type AuthenticatedLayoutProps = {
  children: ReactNode,
}

export default function AuthenticatedLayout({ children }: AuthenticatedLayoutProps) {
  return (
    <CartProvider>
      <Header />
      {children}
    </CartProvider>
  );
}
