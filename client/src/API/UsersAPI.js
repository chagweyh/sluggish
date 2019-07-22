import API from './APIUtils';

export function getUsers() {
  return API.get('/users');
}

export function getCurrentUser() {
  return API.get('/users/me');
}
