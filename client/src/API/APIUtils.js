import axios from 'axios';
import jwtDecode from 'jwt-decode';

export const TOKEN_KEY = 'token';

axios.defaults.baseURL = '/api';

export function setToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}

export function isTokenValid(token) {
  try {
    const decoded_jwt = jwtDecode(token);
    const current_time = Date.now().valueOf() / 1000;
    return decoded_jwt.exp > current_time;
  } catch (error) {
    return false;
  }
}

export default axios;
