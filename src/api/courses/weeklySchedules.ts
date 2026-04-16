import type { WeeklySchedule } from "../../types/weeklySchedule";
import { apiClient } from "../client";

export type WeeklySchedulesApiResponse = {
  data: WeeklySchedule[];
};

export async function getWeeklySchedules(courseId: number) {
  const response = await apiClient.get<WeeklySchedulesApiResponse>(
    `/courses/${courseId}/weekly-schedules`,
  );

  return response.data;
}
