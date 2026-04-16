import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getSessionTypes,
  type SessionTypesApiResponse,
} from "../../api/courses/sessionTypes";

const SESSION_TYPES_STALE_TIME_MS = 5 * 60 * 1000;

export function useSessionTypesQuery(
  courseId: number | null,
  weeklyScheduleId: number | null,
  timeSlotId: number | null,
) {
  return useQuery<SessionTypesApiResponse, AxiosError>({
    enabled:
      courseId !== null && weeklyScheduleId !== null && timeSlotId !== null,
    queryKey: [
      "courses",
      courseId,
      "session-types",
      weeklyScheduleId,
      timeSlotId,
    ],
    queryFn: () =>
      getSessionTypes(
        courseId as number,
        weeklyScheduleId as number,
        timeSlotId as number,
      ),
    retry: false,
    staleTime: SESSION_TYPES_STALE_TIME_MS,
  });
}
