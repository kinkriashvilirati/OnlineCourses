import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getFeaturedCourses,
  type FeaturedCoursesApiResponse,
} from "../../api/courses/featuredCourses";

export function useFeaturedCoursesQuery() {
  return useQuery<FeaturedCoursesApiResponse, AxiosError>({
    queryKey: ["courses", "featured"],
    queryFn: getFeaturedCourses,
    retry: false,
  });
}
