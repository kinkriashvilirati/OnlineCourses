import { useQuery } from "@tanstack/react-query";
import { type AxiosError } from "axios";
import { getCurrentUser, type CurrentUserApiResponse } from "../../api/auth/me";

export function useCurrentUserQuery(enabled: boolean) {
  return useQuery<CurrentUserApiResponse, AxiosError>({
    enabled,
    queryKey: ["auth", "me"],
    queryFn: getCurrentUser,
    retry: false,
  });
}
