import type { Course } from "./courses-type";

export type Enrollment = {
  completedAt: string | null;
  course: Course;
  id: number;
  progress: number;
  quantity: number;
  schedule: {
    location: string | null;
    sessionType: {
      availableSeats: number;
      courseScheduleId: number;
      id: number;
      location: string | null;
      name: "online" | "in_person" | "hybrid";
      priceModifier: number;
    };
    timeSlot: {
      endTime: string;
      id: number;
      label: string;
      startTime: string;
    };
    weeklySchedule: {
      days: string[];
      id: number;
      label: string;
    };
  };
  totalPrice: number;
};
