import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getCourses,
  type CoursesApiResponse,
  type GetCoursesParams,
} from "../../api/courses/courses";
import { SORT_OPTIONS, type SortOption } from "../../utils/sortOptions";

const COURSES_STALE_TIME_MS = 60 * 1000;

type UseCoursesQueryParams = Omit<GetCoursesParams, "sort"> & {
  page: number;
  sort?: SortOption;
};

export function useCoursesQuery({
  page,
  categories,
  topics,
  instructors,
  sort,
}: UseCoursesQueryParams) {
  return useQuery<CoursesApiResponse, AxiosError>({
    queryKey: ["courses", { page, categories, topics, instructors, sort }],
    queryFn: () =>
      getCourses({
        page,
        categories,
        topics,
        instructors,
        sort: sort ? SORT_OPTIONS[sort] : undefined,
      }),
    placeholderData: keepPreviousData,
    retry: false,
    staleTime: COURSES_STALE_TIME_MS,
  });
}
