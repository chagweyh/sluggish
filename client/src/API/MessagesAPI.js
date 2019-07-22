import API from './APIUtils';

export function addMessage(message) {
  return API.post('/messages', message);
}
