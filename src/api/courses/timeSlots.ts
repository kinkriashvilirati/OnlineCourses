import type { TimeSlot } from "../../types/timeSlot";
import { apiClient } from "../client";

export type TimeSlotsApiResponse = {
  data: TimeSlot[];
};

export async function getTimeSlots(
  courseId: number,
  weeklyScheduleId: number,
) {
  const response = await apiClient.get<TimeSlotsApiResponse>(
    `/courses/${courseId}/time-slots`,
    {
      params: {
        weekly_schedule_id: weeklyScheduleId,
      },
    },
  );

  return response.data;
}
