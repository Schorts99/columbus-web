import { parseCookies } from 'nookies';

export default function listAddresses() {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user/addresses`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
