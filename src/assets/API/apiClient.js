import axios from 'axios';
import { useSelector } from 'react-redux';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const state = useSelector((state) => state.authentication);
    const accessToken = state.accessToken;

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
