import { apiClient } from "../client";

export async function deleteEnrollment(enrollmentId: number) {
  await apiClient.delete(`/enrollments/${enrollmentId}`);
}
