import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getDetailedCourse,
  type DetailedCourseApiResponse,
} from "../../api/courses/detailedCourse";

const DETAILED_COURSE_STALE_TIME_MS = 60 * 1000;

export function useDetailedCourseQuery(courseId: number | null) {
  return useQuery<DetailedCourseApiResponse, AxiosError>({
    enabled: courseId !== null,
    queryKey: ["courses", "detail", courseId],
    queryFn: () => getDetailedCourse(courseId as number),
    retry: false,
    staleTime: DETAILED_COURSE_STALE_TIME_MS,
  });
}
