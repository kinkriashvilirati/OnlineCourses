import SessionType from "./SessionType";
import TimeSlot from "./TimeSlot";
import WeeklySchedule from "./WeeklySchedule";

export default function Slot({ id }: { id: number }) {
  switch (id) {
    case 1:
      return <WeeklySchedule />;
    case 2:
      return <TimeSlot />;
    case 3:
      return <SessionType />;
  }
}
