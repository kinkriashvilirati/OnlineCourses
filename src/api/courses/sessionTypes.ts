import type { SessionType } from "../../types/sessionType";
import { apiClient } from "../client";

export type SessionTypesApiResponse = {
  data: SessionType[];
};

export async function getSessionTypes(
  courseId: number,
  weeklyScheduleId: number,
  timeSlotId: number,
) {
  const response = await apiClient.get<SessionTypesApiResponse>(
    `/courses/${courseId}/session-types`,
    {
      params: {
        time_slot_id: timeSlotId,
        weekly_schedule_id: weeklyScheduleId,
      },
    },
  );

  return response.data;
}
