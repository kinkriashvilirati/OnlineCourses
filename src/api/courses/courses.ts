import type { Course } from "../../features/courses-catalog/courses-catalog-type";
import type { PaginationMeta } from "../../types/pagination";
import { apiClient } from "../client";

export type GetCoursesParams = {
  page?: number;
};

export type CoursesApiResponse = {
  data: Course[];
  meta: PaginationMeta;
};

export async function getCourses(params: GetCoursesParams = {}) {
  const response = await apiClient.get<CoursesApiResponse>("/courses", {
    params,
  });

  return response.data;
}
