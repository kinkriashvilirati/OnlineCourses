export type SessionType = {
  availableSeats: number;
  courseScheduleId: number;
  id: number;
  location: string | null;
  name: "online" | "in_person" | "hybrid";
  priceModifier: number;
};
