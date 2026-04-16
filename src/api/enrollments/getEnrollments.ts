import type { Enrollment } from "../../types/enrollment";
import { apiClient } from "../client";

export type EnrollmentsApiResponse = {
  data: Enrollment[];
};

export async function getEnrollments() {
  const response = await apiClient.get<EnrollmentsApiResponse>("/enrollments");

  return response.data;
}
