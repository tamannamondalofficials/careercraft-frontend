import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { getApiBaseUrl } from '@/constants/endpoints';

export const apiClient = axios.create({
  baseURL: getApiBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 15000,
});

// Request Interceptor: dynamically resolve baseURL for local & live environments
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // Dynamically refresh base URL if not explicitly hardcoded
    if (!config.baseURL || config.baseURL === 'undefined') {
      config.baseURL = getApiBaseUrl();
    }
    
    // Attach auth token from storage if present
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response Interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
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

