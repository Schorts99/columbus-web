import React, {
  createContext,
  ReactNode,
  Dispatch,
  useReducer,
  useState,
  useEffect,
  useContext,
} from 'react';
import { CartType } from '../types/Cart';
import UserContext from './User';
import { getCart } from '../api';

type CartProviderProps = {
  children: ReactNode,
}

type CartContextType = {
  cart: CartType | null,
  cartDispatch: Dispatch<any>,
  loadingCart: boolean,
}

const CartContext = createContext<CartContextType>({
  cart: null,
  cartDispatch: () => {},
  loadingCart: true,
});

function reducer(state: null | CartType, action: any) {
  switch (action.type) {
    case 'SET':
      return action.cart;
    case 'INCREASE_COUNT':
      return {
        ...state,
        count: state && (state.count + 1),
        total: state && (state.total + action.price),
      };
    case 'DECREASE_COUNT':
      return {
        ...state,
        count: state && (state.count - 1),
        total: state && (state.total - action.price),
      };
    case 'RESET':
      return {
        ...state,
        count: 0,
        total: 0,
      };
    default:
      return state;
  }
}

function CartProvider({ children }: CartProviderProps) {
  const { currentUser } = useContext(UserContext);
  const [state, dispatch] = useReducer(reducer, null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (currentUser?.role.name === 'customer') {
      getCart().then(async (res) => {
        const parsedBody = await res.json();

        dispatch({
          cart: parsedBody.data?.attributes,
          type: 'SET',
        });
      }).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  return (
    <CartContext.Provider
      value={{
        cart: state,
        cartDispatch: dispatch,
        loadingCart: loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export { CartProvider };
export default CartContext;
