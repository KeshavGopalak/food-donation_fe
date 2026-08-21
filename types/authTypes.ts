// Payload sent to the login endpoint
export interface LoginPayload {
  email: string;
  password: string;
}

// User object structure returned by backend
export interface User {
  id: string;
  _id?: string;
  email: string;
  name?: string;
  role?: string;
  status?: string;
  verified?: boolean;
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
  role?: "user" | "volunteer";
  volunteerDetails?: {
    experience: string;
    availability: string;
    skills: string;
    transportation: string;
  };
}
export interface RegisterResponse {
  message?: string;
  token?: string;
  user: User;
}