import { apiClient } from "../client";
import type { RegisterApiUser } from "./register";

export type LoginApiRequest = {
  email: string;
  password: string;
};

export type LoginApiResponse = {
  data: {
    token: string;
    user: RegisterApiUser;
  };
};

export async function loginUser(payload: LoginApiRequest) {
  const response = await apiClient.post<LoginApiResponse>("/login", payload);

  return response.data;
}
