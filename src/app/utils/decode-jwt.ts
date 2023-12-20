import { jwtDecode } from 'jwt-decode';

export const decodeJwt = () => {
  let token: string | null = localStorage.getItem('token');
  if (token) {
    let tokenData = jwtDecode(token);
    return tokenData;
  }
  return null;
};
