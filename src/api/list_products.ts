import { parseCookies } from 'nookies';

type ListProductsParams = {
  page: number,
}

export default function listProducts({ page }: ListProductsParams) {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/products?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
