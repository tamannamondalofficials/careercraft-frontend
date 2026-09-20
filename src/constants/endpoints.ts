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
    SUBMIT: '/resumes/',
    CREATE: '/resumes/',
    GENERATE: '/resumes/',
    LIST: '/resumes/',
    GET_BY_ID: (id: string | number) => `/resumes/${id}/`,
    UPDATE: (id: string | number) => `/resumes/${id}/`,
    DELETE: (id: string | number) => `/resumes/${id}/`,
  }
} as const;

export const DEFAULT_LOCAL_API_URL = 'http://127.0.0.1:8000/api/v1';
export const DEFAULT_PROD_API_URL = 'https://careercraft-di1t.onrender.com/api/v1';

/**
 * Normalizes any API URL by trimming whitespace and trailing slashes
 */
export function normalizeApiUrl(url: string): string {
  if (!url || !url.trim()) return DEFAULT_LOCAL_API_URL;
  return url.trim().replace(/\/+$/, '');
}

/**
 * Dynamically resolves the API Base URL:
 * 1. Checks NEXT_PUBLIC_API_URL environment variable
 * 2. Checks browser window hostname (localhost vs live host)
 * 3. Checks NODE_ENV (production vs development)
 */
export function getApiBaseUrl(): string {
  // 1. Explicit env var
  if (process.env.NEXT_PUBLIC_API_URL && process.env.NEXT_PUBLIC_API_URL.trim()) {
    return normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);
  }

  // 2. Client-side runtime detection
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname === '0.0.0.0') {
      return DEFAULT_LOCAL_API_URL;
    }
    // Live hosted domain (e.g. Render, Vercel, Netlify, custom domain)
    return DEFAULT_PROD_API_URL;
  }

  // 3. Server-side fallback
  if (process.env.NODE_ENV === 'production') {
    return DEFAULT_PROD_API_URL;
  }

  return DEFAULT_LOCAL_API_URL;
}

export const API_BASE_URL = getApiBaseUrl();

