import { parseCookies } from 'nookies';

type AddProductToCartParams = {
  id: string | number,
  increase: boolean,
}

export default function addProductToCart(params: AddProductToCartParams) {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user/cart/products`, {
    method: 'PATCH',
    body: JSON.stringify({ product: params }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
