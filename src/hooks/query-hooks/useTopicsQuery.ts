import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getTopics, type TopicsApiResponse } from "../../api/courses/topics";

export function useTopicsQuery(selectedCategoryIds: number[]) {
  return useQuery<TopicsApiResponse, AxiosError>({
    queryKey: ["topics", { categories: selectedCategoryIds }],
    queryFn: () => getTopics({ categories: selectedCategoryIds }),
    retry: false,
    staleTime: Infinity,
  });
}
