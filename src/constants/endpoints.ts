export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    ME: '/auth/me',
  },
  USERS: {
    PROFILE: '/users/profile',
    UPDATE: '/users/update',
  },
  RESUME: {
    SUBMIT: '/resumes',
    CREATE: '/resumes',
    GENERATE: '/resumes',
    LIST: '/resumes',
    GET_BY_ID: (id: string | number) => `/resumes/${id}`,
    UPDATE: (id: string | number) => `/resumes/${id}`,
    DELETE: (id: string | number) => `/resumes/${id}`,
  }
} as const;

// Base API URL default to Django / FastAPI backend at port 8000
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api';
