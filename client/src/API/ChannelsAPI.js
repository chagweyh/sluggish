import API from './APIUtils';

export function getChannels() {
  return API.get('/channels');
}

export function getChannel(slug) {
  return API.get(`/channels/${slug}`);
}

export function addChannel(channel) {
  return API.post('/channels', channel);
}

export function starChannel(id) {
  return API.post(`channels/${id}/star`);
}

export function addMessage(channelId, text) {
  return API.post(`channels/${channelId}/messages`, { text });
}
