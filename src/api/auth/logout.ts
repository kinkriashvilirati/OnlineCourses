import { apiClient } from "../client";

export async function logoutUser() {
  await apiClient.post("/logout");
}
