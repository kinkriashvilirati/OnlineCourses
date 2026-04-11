import type { Enrollment } from "../../types/enrollment";
import { apiClient } from "../client";

export type CoursesInProgressApiResponse = {
  data: Enrollment[];
};

export async function getCoursesInProgress() {
  const response =
    await apiClient.get<CoursesInProgressApiResponse>("/courses/in-progress");

  return response.data;
}
