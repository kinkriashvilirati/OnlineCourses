import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { getTopics, type TopicsApiResponse } from "../../api/courses/topics";

export function useTopicsQuery() {
  return useQuery<TopicsApiResponse, AxiosError>({
    queryKey: ["topics"],
    queryFn: getTopics,
    retry: false,
    // Topics are reference/filter data and should stay stable during a session,
    // so caching them indefinitely avoids pointless refetches on remount/focus.
    staleTime: Infinity,
  });
}
