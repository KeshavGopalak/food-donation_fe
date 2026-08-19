import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "@/types/authTypes";
import api from "@/api/axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authService = {
  /**
   * Sends user login credentials to the API
   */
  login: async (credentials: LoginPayload): Promise<LoginResponse> => {
    try {
      const res = await api.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, credentials, { withCredentials: true });
      return res.data;
    } catch (error: unknown) {
      const response = error && typeof error === "object" && "response" in error ? error.response : null;
      const message = response && typeof response === "object" && response !== null && "data" in response && response.data && typeof response.data === "object" && "message" in response.data ? String(response.data.message) : "Login failed";
      throw new Error(message);
    }
  },
  Register: async (credentials: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const res = await api.post<RegisterResponse>(`${API_BASE_URL}/api/auth/register`, credentials, { withCredentials: true });
      return res.data;
    } catch (error: unknown) {
      const response = error && typeof error === "object" && "response" in error ? error.response : null;
      const message = response && typeof response === "object" && response !== null && "data" in response && response.data && typeof response.data === "object" && "message" in response.data ? String(response.data.message) : "Registration failed";
      throw new Error(message);
    }
  }
};

export async function updateProfile(profile: { name?: string; email?: string; avatar?: string }) {
  const response = await fetch(`${API_BASE_URL}/api/auth/profile`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(profile),
  });

  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Unable to update profile");
  return data.user;
}

