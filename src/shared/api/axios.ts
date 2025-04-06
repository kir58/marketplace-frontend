// shared/api/axios.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:9090/api',
  withCredentials: true,
});

export default api;
