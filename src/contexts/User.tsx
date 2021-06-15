import React, {
  createContext,
  useReducer,
  ReactNode,
  useState,
  useEffect,
  Dispatch,
} from 'react';
import { setCookie, destroyCookie } from 'nookies';
import { UserType } from '../types/User';
import { getCurrentUser } from '../api';

type UserProviderProps = {
  children: ReactNode,
}

type UserContextType = {
  currentUser: null | UserType,
  currentUserDispatch: Dispatch<any>,
  loadingCurrentUser: boolean,
}

const UserContext = createContext<UserContextType>({
  currentUser: null,
  currentUserDispatch: () => {},
  loadingCurrentUser: true,
});

function reducer(state: null | UserType, action: any) {
  switch (action.type) {
    case 'LOGIN':
      setCookie(null, 'authorization', action.token);

      return action.user;
    case 'SET':
      return action.user;
    case 'LOGOUT':
      destroyCookie(null, 'authorization');

      return null;
    default:
      return state;
  }
}

function UserProvider({ children }: UserProviderProps) {
  const [state, dispatch] = useReducer(reducer, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentUser().then(async (res) => {
      const parsedBody = await res.json();

      dispatch({
        user: parsedBody.data?.attributes,
        type: 'SET',
      });
    }).finally(() => setLoading(false));
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser: state,
        currentUserDispatch: dispatch,
        loadingCurrentUser: loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export { UserProvider };
export default UserContext;
