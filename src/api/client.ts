import axios from "axios";
import { getAccessToken } from "./authSession";

export const apiClient = axios.create({
  baseURL: "https://api.redclass.redberryinternship.ge/api",
});

apiClient.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (!accessToken) {
    return config;
  }

  config.headers = config.headers ?? {};
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});
