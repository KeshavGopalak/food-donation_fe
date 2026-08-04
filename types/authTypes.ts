// Payload sent to the login endpoint
export interface LoginPayload {
  email: string;
  password: string;
}

// User object structure returned by backend
export interface User {
  id: string;
  email: string;
  name?: string;
  role?: string;
}

// Full response returned from POST /api/auth/login
export interface LoginResponse {
  message?: string;
  token?: string;
  user: User;
}

// Generic API error response structure
export interface ApiError {
  message: string;
  statusCode?: number;
}
export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}
export interface RegisterResponse {
  message?: string;
  token?: string;
  user: User;
}