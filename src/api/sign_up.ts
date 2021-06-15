type SignUpParams = {
  name: string,
  age: string,
  sex: string,
  email: string,
  password: string,
}

export default function signUp(params: SignUpParams) {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/signup`, {
    method: 'POST',
    body: JSON.stringify({ user: params }),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
