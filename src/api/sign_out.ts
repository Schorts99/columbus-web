export default function signOut() {
  return fetch(`${process.env.REACT_APP_API_ENDPOINT}/logout`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
  });
}
