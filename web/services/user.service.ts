import { USER_ENDPOINTS } from "@/apis/endpoint";
import axiosConfig from "@/config/axiosConfig";

export const UserService = {
  updateUserProfile: async (data: any) => {
    try {
      const response = await axiosConfig.put(
        USER_ENDPOINTS.UPDATE_PROFILE,
        data,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};
