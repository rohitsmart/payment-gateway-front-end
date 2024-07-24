import axios from 'axios';

const apiClient = axios.create({
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/hal+json',
  },
});

// Interceptor to attach token if needed
apiClient.interceptors.request.use(
  (config) => {
    // Handle token attachment here if needed
    return config;
  },
  (error) => Promise.reject(error)
);

export const get = async (url, token = null, params = {}) => {
  const config = { params };
  if (token) config.headers = { Authorization: `Bearer ${token}` };
  const response = await apiClient.get(url, config);
  return response.data;
};

export const post = async (url, data = {}, token = null) => {
  const config = {};
  if (token) config.headers = { Authorization: `Bearer ${token}` };
  const response = await apiClient.post(url, data, config);
  return response.data;
};

export const put = async (url, data = {}, token = null) => {
  const config = {};
  if (token) config.headers = { Authorization: `Bearer ${token}` };
  const response = await apiClient.put(url, data, config);
  return response.data;
};

export const del = async (url, token = null) => {
  const config = {};
  if (token) config.headers = { Authorization: `Bearer ${token}` };
  const response = await apiClient.delete(url, config);
  return response.data;
};
