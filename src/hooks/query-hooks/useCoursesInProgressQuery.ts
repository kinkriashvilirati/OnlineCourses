import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getCoursesInProgress,
  type CoursesInProgressApiResponse,
} from "../../api/courses/coursesInProgress";

const COURSES_IN_PROGRESS_STALE_TIME_MS = 60 * 1000;

export function useCoursesInProgressQuery(isAuthenticated: boolean) {
  return useQuery<CoursesInProgressApiResponse, AxiosError>({
    enabled: isAuthenticated,
    queryKey: ["courses", "in-progress"],
    queryFn: getCoursesInProgress,
    retry: false,
    staleTime: COURSES_IN_PROGRESS_STALE_TIME_MS,
  });
}
