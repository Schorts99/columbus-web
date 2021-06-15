import { parseCookies } from 'nookies';

export default function getCurrentUser() {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
