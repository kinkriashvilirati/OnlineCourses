import SessionType from "./SessionType";
import TimeSlot from "./TimeSlot";
import WeeklySchedule from "./WeeklySchedule";

type SlotProps = {
  id: number;
  onSelectSessionType: (id: number, priceModifier: number) => void;
  onSelectTimeSlot: (id: number) => void;
  onSelectWeeklySchedule: (id: number) => void;
  selectedSessionTypeId: number | null;
  selectedTimeSlotId: number | null;
  selectedWeeklyScheduleId: number | null;
};

export default function Slot({
  id,
  onSelectSessionType,
  onSelectTimeSlot,
  onSelectWeeklySchedule,
  selectedSessionTypeId,
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
      return (
        <SessionType
          onSelectSessionType={onSelectSessionType}
          selectedSessionTypeId={selectedSessionTypeId}
          selectedTimeSlotId={selectedTimeSlotId}
          selectedWeeklyScheduleId={selectedWeeklyScheduleId}
        />
      );
    default:
      return null;
  }
}
