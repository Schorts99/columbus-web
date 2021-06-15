import React, { useContext, ReactNode } from 'react';
import { ToastContainer } from 'react-toastify';
import UserContext from '../contexts/User';
import AuthenticatedLayout from './Authenticated';
import UnauthenticatedLayout from './Unauthenticated';

type LayoutsProps = {
  children: ReactNode,
}

export default function Layouts({ children }: LayoutsProps) {
  const { currentUser } = useContext(UserContext);

  return (
    <>
      {currentUser ? (
        <AuthenticatedLayout>
          {children}
        </AuthenticatedLayout>
      ) : (
        <UnauthenticatedLayout>
          {children}
        </UnauthenticatedLayout>
      )}
      <ToastContainer />
    </>
  );
}
