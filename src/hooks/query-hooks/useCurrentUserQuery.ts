import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { getCurrentUser, type CurrentUserApiResponse } from "../../api/auth/me";

const CURRENT_USER_STALE_TIME_MS = 5 * 60 * 1000;

export function useCurrentUserQuery(enabled: boolean) {
  return useQuery<CurrentUserApiResponse, AxiosError>({
    enabled,
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
    // so we can trust this cached `/me` result for a short period and avoid noisy refetches.
    staleTime: CURRENT_USER_STALE_TIME_MS,
  });
}
