import React, { ReactNode, useContext } from 'react';
import { Route as BaseRoute, Redirect } from 'react-router-dom';
import UserContext from '../../contexts/User';

type RouteProps = {
  children: ReactNode,
  policy?: string,
  authChildren?: ReactNode,
  exact?: boolean,
  path: string
}

export default function Route({
  children,
  authChildren,
  policy,
  ...parentProps
}: RouteProps) {
  const { currentUser } = useContext(UserContext);

  return (
    <BaseRoute
      {...parentProps}
      render={({ location }) => {
        switch (policy) {
          case 'only-not-auth':
            if (!currentUser) {
              return children;
            }

            break;

          case 'only-auth':
            if (currentUser) {
              return children;
            }

            break;
          case 'all':
            if (currentUser) {
              return authChildren;
            }

            return children;
          case 'only-customer':
            if (currentUser?.role.name === 'customer') {
              return children;
            }

            break;
          default:
            return children;
        }

        return (
          <Redirect
            to={{
              pathname: '/',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
}

Route.defaultProps = {
  authChildren: null,
  exact: null,
  policy: '',
};
