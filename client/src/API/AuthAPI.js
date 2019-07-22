import API, { TOKEN_KEY } from './APIUtils';
import { setLocalStorage } from '../utils';
import { setToken } from './APIUtils';

function handleUserResponse(token) {
  setLocalStorage(TOKEN_KEY, token);
  setToken(token);
}

export function register(user) {
  return API.post('/auth/signup', user).then((response) => {
    handleUserResponse(response.data.token);
  });
}

export function login(email, password) {
  return API.post('/auth/signin', { email, password }).then((response) => {
    console.log(response);
    handleUserResponse(response.data);
  });
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  setToken(null);
}
