import { LoginPayload, LoginResponse, RegisterPayload, RegisterResponse } from "@/types/authTypes";
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export const authService = {
  /**
   * Sends user login credentials to the API
   */
  login: async (credentials: LoginPayload): Promise<LoginResponse> => {
    try {
      const res = await axios.post<LoginResponse>(`${API_BASE_URL}/api/auth/login`, credentials);
      return res.data;
    } catch (error:any) {
      const message = error.response?.data?.message || "Login failed";
      throw new Error(message);
    }
  },
  Register: async (credentials: RegisterPayload): Promise<RegisterResponse> => {
    try {
      const res = await axios.post<RegisterResponse>(`${API_BASE_URL}/api/auth/register`, credentials);
      return res.data;
    } catch (error:any) {
      const message = error.response?.data?.message || "Registration failed";
      throw new Error(message);
    }
  }
};