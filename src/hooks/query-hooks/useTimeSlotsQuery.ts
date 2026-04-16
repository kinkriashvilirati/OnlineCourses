import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getTimeSlots,
  type TimeSlotsApiResponse,
} from "../../api/courses/timeSlots";

const TIME_SLOTS_STALE_TIME_MS = 5 * 60 * 1000;

export function useTimeSlotsQuery(
  courseId: number | null,
  weeklyScheduleId: number | null,
) {
  return useQuery<TimeSlotsApiResponse, AxiosError>({
    enabled: courseId !== null && weeklyScheduleId !== null,
    queryKey: ["courses", courseId, "time-slots", weeklyScheduleId],
    queryFn: () => getTimeSlots(courseId as number, weeklyScheduleId as number),
    retry: false,
    staleTime: TIME_SLOTS_STALE_TIME_MS,
  });
}
