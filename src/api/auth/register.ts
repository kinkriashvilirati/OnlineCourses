import { apiClient } from "../client";

export type RegisterApiRequest = {
  avatar?: File | null;
  email: string;
  password: string;
  password_confirmation: string;
  username: string;
};

export type RegisterApiUser = {
  age: number | null;
  avatar: string | null;
  email: string;
  fullName: string | null;
  id: number;
  mobileNumber: string | null;
  profileComplete: boolean;
  username: string;
};

export type RegisterApiResponse = {
  data: {
    user: RegisterApiUser;
    token: string;
  };
};

function buildRegisterFormData(payload: RegisterApiRequest) {
  const formData = new FormData();

  formData.append("username", payload.username);
  formData.append("email", payload.email);
  formData.append("password", payload.password);
  formData.append("password_confirmation", payload.password_confirmation);

  if (payload.avatar) {
    formData.append("avatar", payload.avatar);
  }

  return formData;
}

export async function registerUser(payload: RegisterApiRequest) {
  const response = await apiClient.post<RegisterApiResponse>(
    "/register",
    buildRegisterFormData(payload),
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    },
  );

  return response.data;
}
