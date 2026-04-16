import { useParams } from "react-router";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useWeeklySchedulesQuery } from "../../../../hooks/query-hooks/useWeeklySchedulesQuery";
import type { WeeklySchedule as WeeklyScheduleItem } from "../../../../types/weeklySchedule";
import { ErrorComponent } from "../../../../components/error/Error";

const shortDayMap: Record<string, string> = {
  Monday: "Mon",
  Tuesday: "Tue",
  Wednesday: "Wed",
  Thursday: "Thu",
  Friday: "Fri",
  Saturday: "Sat",
  Sunday: "Sun",
};

function shortenDayLabel(label: string) {
  return label.replace(
    /Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday/g,
    (day) => shortDayMap[day],
  );
}
type WeeklyScheduleProps = {
  onSelectWeeklySchedule: (id: number) => void;
  selectedWeeklyScheduleId: number | null;
};

export default function WeeklySchedule({
  onSelectWeeklySchedule,
  selectedWeeklyScheduleId,
}: WeeklyScheduleProps) {
  const { courseId } = useParams();
  const parsedCourseId = Number(courseId);
  const resolvedCourseId = Number.isInteger(parsedCourseId)
    ? parsedCourseId
    : null;
  const weeklySchedulesQuery = useWeeklySchedulesQuery(resolvedCourseId);

  if (resolvedCourseId === null) {
    return <ErrorComponent description="Failed to load schedules" />;
  }

  if (weeklySchedulesQuery.isPending) {
    return <LoadingDots />;
  }

  if (weeklySchedulesQuery.isError) {
    return <ErrorComponent description="Failed to load schedules" />;
  }

  const schedules = weeklySchedulesQuery.data.data;
  const gridCols =
    schedules.length === 1
      ? "grid-cols-1"
      : schedules.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";

  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {schedules.map((schedule: WeeklyScheduleItem) => {
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2  items-center">
              <button
                aria-pressed={selectedWeeklyScheduleId === schedule.id}
                className={`w-full rounded-xl border px-5 py-3.75 flex items-center gap-3 transition-all duration-300 group cursor-pointer ${
                  selectedWeeklyScheduleId === schedule.id
                    ? "text-purple-800 bg-purple-200 border-purple-400"
                    : "text-grayscale-800 border-grayscale-200 hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300"
                }`}
                onClick={() => onSelectWeeklySchedule(schedule.id)}
                type="button"
              >
                <div className="flex flex-col">
                  <h5 className="text-h5 text-body-xs">
                    {shortenDayLabel(schedule.label)}
                  </h5>
                </div>
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
