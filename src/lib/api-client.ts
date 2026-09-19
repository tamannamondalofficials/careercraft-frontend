import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { API_BASE_URL } from '@/constants/endpoints';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // timeout: 10000, // Optional timeout
});

// Request Interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Example: Add auth token to headers if it exists
    // const token = localStorage.getItem('auth_token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // We can directly return response.data if we want to unwrap it here
    return response;
  },
  (error: AxiosError) => {
    // Handle global errors (e.g., 401 Unauthorized -> redirect to login)
    if (error.response?.status === 401) {
      // e.g. window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
