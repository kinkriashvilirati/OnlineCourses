import type { Course } from "../../types/courses-type";
import type { PaginationMeta } from "../../types/pagination";
import { apiClient } from "../client";

export type GetCoursesParams = {
  page?: number;
  categories?: number[];
  topics?: number[];
  instructors?: number[];
  sort?: string;
};

export type CoursesApiResponse = {
  data: Course[];
  meta: PaginationMeta;
};

export async function getCourses(params: GetCoursesParams = {}) {
  console.log(params);
  const queryParams = {
    ...(params.page !== undefined ? { page: params.page } : {}),
    ...(params.categories && params.categories.length > 0
      ? { "categories[]": params.categories }
      : {}),
    ...(params.topics && params.topics.length > 0
      ? { "topics[]": params.topics }
      : {}),
    ...(params.instructors && params.instructors.length > 0
      ? { "instructors[]": params.instructors }
      : {}),
    ...(params.sort ? { sort: params.sort } : {}),
  };

  const response = await apiClient.get<CoursesApiResponse>("/courses", {
    params: queryParams,
  });
  return response.data;
}
