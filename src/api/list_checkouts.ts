import { parseCookies } from 'nookies';

type ListCheckoutsParams = {
  page: number,
}

export default function listCheckouts({ page }: ListCheckoutsParams) {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/checkouts?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
