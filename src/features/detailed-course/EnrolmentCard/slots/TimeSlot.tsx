import { useParams } from "react-router";
import GetSlotsSectionsIcons from "../../../../assets/icons/schedules-secctions-icon/GetSlotsSectionsIcons";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useTimeSlotsQuery } from "../../../../hooks/query-hooks/useTimeSlotsQuery";
import type { TimeSlot as TimeSlotItem } from "../../../../types/timeSlot";
import { ErrorComponent } from "../../../../components/error/Error";

type TimeSlotProps = {
  onSelectTimeSlot: (id: number) => void;
  selectedTimeSlotId: number | null;
  selectedWeeklyScheduleId: number | null;
};

export default function TimeSlot({
  onSelectTimeSlot,
  selectedTimeSlotId,
  selectedWeeklyScheduleId,
}: TimeSlotProps) {
  const { courseId } = useParams();
  const parsedCourseId = Number(courseId);
  const resolvedCourseId = Number.isInteger(parsedCourseId)
    ? parsedCourseId
    : null;
  const timeSlotsQuery = useTimeSlotsQuery(
    resolvedCourseId,
    selectedWeeklyScheduleId,
  );

  if (resolvedCourseId === null) {
    return <ErrorComponent />;
  }

  if (selectedWeeklyScheduleId === null) {
    return null;
  }

  if (timeSlotsQuery.isPending) {
    return <LoadingDots />;
  }

  if (timeSlotsQuery.isError) {
    return <p>Failed to load time slots</p>;
  }

  const timeSlots = timeSlotsQuery.data.data;
  const gridCols =
    timeSlots.length === 1
      ? "grid-cols-1"
      : timeSlots.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  const Icon = GetSlotsSectionsIcons.cloud_sun;
  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {timeSlots.map((schedule: TimeSlotItem) => {
        const [title, time] = schedule.label.split(" (");
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2  items-center">
              <button
                aria-pressed={selectedTimeSlotId === schedule.id}
                className="text-grayscale-500 w-full rounded-xl border-grayscale-200 px-5 py-3.75 border flex  items-center gap-3 transition-all duration-300 group hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300 cursor-pointer"
                onClick={() => onSelectTimeSlot(schedule.id)}
                type="button"
              >
                <div className="flex flex-col gap-1.5 items-center ">
                  <Icon />
                </div>
                <div className="flex flex-col">
                  <p className="text-body-xs">{title}</p>
                  <p className="text-helper-regular">
                    {" "}
                    {time.replace(")", "")}
                  </p>
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
/**
   * icons:
  cloud_sun,
  desktop,
  intersect,
  moon,
  sun,
  users,
   */
