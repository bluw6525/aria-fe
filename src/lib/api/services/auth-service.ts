import httpClient from "../http/client";
import { UserProfile } from "@/store/auth-store";

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: UserProfile;
}

export const authService = {
  async login(username: string, password: string):Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>("/auth/login", {
      username,
      password,
    });
    return response.data;
  },

  async getMe(): Promise<UserProfile> {
    const response = await httpClient.get<UserProfile>("/auth/me");
    return response.data;
  },
};
