import { apiClient } from "../client";
import type { RegisterApiUser } from "./register";

export type CurrentUserApiResponse = {
  data: RegisterApiUser;
};

export async function getCurrentUser() {
  const response = await apiClient.get<CurrentUserApiResponse>("/me");
  console.log(response.data);
  return response.data;
}
