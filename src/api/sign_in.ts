type SignInParams = {
  email: string,
  password: string,
}

export default function signIn(params: SignInParams) {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/login`, {
    method: 'POST',
    body: JSON.stringify({ user: params }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
