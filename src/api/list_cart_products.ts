import { parseCookies } from 'nookies';

export default function listCartProducts() {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user/cart/products`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
