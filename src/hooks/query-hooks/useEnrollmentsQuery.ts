import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";

import {
  getEnrollments,
  type EnrollmentsApiResponse,
} from "../../api/enrollments/getEnrollments";
const STALE_TIME = 2 * 60 * 100;
export function useEnrollmentsQuery() {
  return useQuery<EnrollmentsApiResponse, AxiosError>({
    queryKey: ["enrollments"],
    queryFn: getEnrollments,
    retry: false,
    staleTime: STALE_TIME,
  });
}
