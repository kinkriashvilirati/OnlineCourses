import type { Enrollment } from "../../types/enrollment";
import { apiClient } from "../client";

export type CompleteEnrollmentApiResponse = {
  data: Enrollment;
};

export async function completeEnrollment(enrollmentId: number) {
  const response = await apiClient.patch<CompleteEnrollmentApiResponse>(
    `/enrollments/${enrollmentId}/complete`,
  );

  return response.data;
}
