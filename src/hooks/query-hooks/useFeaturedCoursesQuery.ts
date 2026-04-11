import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getFeaturedCourses,
  type FeaturedCoursesApiResponse,
} from "../../api/courses/featuredCourses";

const FEATURED_COURSES_STALE_TIME_MS = 10 * 60 * 1000;

export function useFeaturedCoursesQuery() {
  return useQuery<FeaturedCoursesApiResponse, AxiosError>({
    queryKey: ["courses", "featured"],
    queryFn: getFeaturedCourses,
    retry: false,
    // Featured courses are public marketing content and should not change minute-to-minute,
    // so a longer stale window avoids unnecessary refetches on remount/focus.
    staleTime: FEATURED_COURSES_STALE_TIME_MS,
  });
}
