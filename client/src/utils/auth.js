import jwtDecode from 'jwt-decode';

export function isTokenExpired() {
  try {
    const decoded_jwt = jwtDecode(getJwt());
    const current_time = Date.now().valueOf() / 1000;
    return current_time > decoded_jwt.exp;
  } catch (err) {
    return true;
  }
}

export function getJwt() {
  return localStorage.getItem('token') || null;
}
