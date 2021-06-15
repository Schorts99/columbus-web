import { parseCookies } from 'nookies';
import { AddressType } from '../types/Address';

export default function createAddress(params: AddressType) {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user/addresses`, {
    method: 'POST',
    body: JSON.stringify({ address: params }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
