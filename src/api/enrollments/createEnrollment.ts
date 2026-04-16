import type { Enrollment } from "../../types/enrollment";
import { apiClient } from "../client";

export type CreateEnrollmentApiRequest = {
  courseId: number;
  courseScheduleId: number;
  force?: boolean;
};

export type CreateEnrollmentApiResponse = {
  data: Enrollment;
  message: string;
};

export async function createEnrollment(payload: CreateEnrollmentApiRequest) {
  const response = await apiClient.post<CreateEnrollmentApiResponse>(
    "/enrollments",
    payload,
  );

  return response.data;
}
