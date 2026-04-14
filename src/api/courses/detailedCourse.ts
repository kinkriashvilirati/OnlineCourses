import type { DetailedCourse } from "../../types/courses-type";
import { apiClient } from "../client";

export type DetailedCourseApiResponse = {
  data: DetailedCourse;
};

export async function getDetailedCourse(courseId: number) {
  const response = await apiClient.get<DetailedCourseApiResponse>(
    `/courses/${courseId}`,
  );

  return response.data;
}
