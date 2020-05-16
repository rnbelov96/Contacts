import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000',
  timeout: 5000,
});

api.interceptors.request.use(
  config => {
    // eslint-disable-next-line no-param-reassign
    config.headers.authorization = localStorage.getItem('token');
    return config;
  },
  error => Promise.reject(error),
);

export default api;
