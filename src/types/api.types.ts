// Generic API Response wrapper
export interface ApiResponse<T = any> {
  success: boolean;
  message: string;
  data: T;
}

// Error Response
export interface ApiError {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

// Example user type
export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}
