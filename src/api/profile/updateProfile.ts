import type { RegisterApiUser } from "../auth/register";
import { apiClient } from "../client";

export type UpdateProfileApiRequest = {
  age: number;
  fullName: string;
  mobileNumber: string;
};

export type UpdateProfileApiResponse = {
  data: RegisterApiUser;
};

function buildUpdateProfileFormData(payload: UpdateProfileApiRequest) {
  const formData = new FormData();

  formData.append("full_name", payload.fullName.trim());
  formData.append("mobile_number", payload.mobileNumber.replace(/\s+/g, ""));
  formData.append("age", String(payload.age));

  return formData;
}

export async function updateProfile(payload: UpdateProfileApiRequest) {
  const response = await apiClient.put<UpdateProfileApiResponse>(
    "/profile",
    buildUpdateProfileFormData(payload),
  );

  return response.data;
}
