import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getCourses, type CoursesApiResponse } from "../../api/courses/courses";

const COURSES_STALE_TIME_MS = 60 * 1000;

export function useCoursesQuery(page: number) {
  return useQuery<CoursesApiResponse, AxiosError>({
    queryKey: ["courses", { page }],
    queryFn: () => getCourses({ page }),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: COURSES_STALE_TIME_MS,
  });
}
