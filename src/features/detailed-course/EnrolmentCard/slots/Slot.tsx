import SessionType from "./SessionType";
import TimeSlot from "./TimeSlot";
import WeeklySchedule from "./WeeklySchedule";

type SlotProps = {
  id: number;
  onSelectTimeSlot: (id: number) => void;
  onSelectWeeklySchedule: (id: number) => void;
  selectedTimeSlotId: number | null;
  selectedWeeklyScheduleId: number | null;
};

export default function Slot({
  id,
  onSelectTimeSlot,
  onSelectWeeklySchedule,
  selectedTimeSlotId,
  selectedWeeklyScheduleId,
}: SlotProps) {
  switch (id) {
    case 1:
      return (
        <WeeklySchedule
          onSelectWeeklySchedule={onSelectWeeklySchedule}
          selectedWeeklyScheduleId={selectedWeeklyScheduleId}
        />
      );
    case 2:
      return (
        <TimeSlot
          onSelectTimeSlot={onSelectTimeSlot}
          selectedTimeSlotId={selectedTimeSlotId}
          selectedWeeklyScheduleId={selectedWeeklyScheduleId}
        />
      );
    case 3:
      return <SessionType />;
    default:
      return null;
  }
}
