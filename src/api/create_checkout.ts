import { parseCookies } from 'nookies';

type CreateCheckoutParams = {
  // eslint-disable-next-line camelcase
  address_id: string | null
}

export default function createCheckout(params: CreateCheckoutParams) {
  const authToken = parseCookies().authorization;

  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/current_user/checkout`, {
    method: 'POST',
    body: JSON.stringify({ checkout: params }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: authToken,
    },
  });
}
