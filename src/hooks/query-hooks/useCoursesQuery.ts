import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getCourses,
  type CoursesApiResponse,
  type GetCoursesParams,
} from "../../api/courses/courses";

const COURSES_STALE_TIME_MS = 60 * 1000;

export function useCoursesQuery({
  page,
  categories,
  topics,
  instructors,
}: Required<Pick<GetCoursesParams, "page">> & Omit<GetCoursesParams, "page">) {
  return useQuery<CoursesApiResponse, AxiosError>({
    queryKey: ["courses", { page, categories, topics, instructors }],
    queryFn: () => getCourses({ page, categories, topics, instructors }),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: COURSES_STALE_TIME_MS,
  });
}
