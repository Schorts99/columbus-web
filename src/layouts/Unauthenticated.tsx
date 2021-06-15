import React, { ReactNode } from 'react';

type UnauthenticatedLayoutProps = {
  children: ReactNode,
}

export default function UnauthenticatedLayout({ children }: UnauthenticatedLayoutProps) {
  return (
    <>
      {children}
    </>
  );
}
