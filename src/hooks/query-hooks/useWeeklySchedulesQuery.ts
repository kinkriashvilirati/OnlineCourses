import { useQuery } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import {
  getWeeklySchedules,
  type WeeklySchedulesApiResponse,
} from "../../api/courses/weeklySchedules";

const WEEKLY_SCHEDULES_STALE_TIME_MS = 5 * 60 * 1000;

export function useWeeklySchedulesQuery(courseId: number | null) {
  return useQuery<WeeklySchedulesApiResponse, AxiosError>({
    enabled: courseId !== null,
    queryKey: ["courses", courseId, "weekly-schedules"],
    queryFn: () => getWeeklySchedules(courseId as number),
    retry: false,
    staleTime: WEEKLY_SCHEDULES_STALE_TIME_MS,
  });
}
