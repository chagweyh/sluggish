import axios from 'axios';
import { getJwt } from './auth';

export default axios.create({
  baseURL: '/api/',
  headers: { 'x-auth-token': getJwt() },
});
