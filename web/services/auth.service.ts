import { AUTH_ENDPOINTS } from "@/apis/endpoint";
import axios from "axios";
import axiosConfig, { API_URL } from "@/config/axiosConfig";
import { SignInFormData, SignUpFormData } from "@/schemas/auth.schema";

export const AuthService = {
  checkAuth: async () => {
    try {
      const response = await axiosConfig.get(AUTH_ENDPOINTS.CHECK_AUTH);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  signIn: async (data: SignInFormData) => {
    try {
      const response = await axios.post(
        `${API_URL}${AUTH_ENDPOINTS.SIGN_IN}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  signUp: async (data: SignUpFormData) => {
    try {
      const response = await axios.post(
        `${API_URL}${AUTH_ENDPOINTS.SIGN_UP}`,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
