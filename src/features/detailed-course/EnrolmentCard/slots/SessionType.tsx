import { useParams } from "react-router";
import GetModdelacons from "../../../../assets/icons/modalIcons/GetModellacons";
import GetSlotsSectionsIcons from "../../../../assets/icons/schedules-secctions-icon/GetSlotsSectionsIcons";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useSessionTypesQuery } from "../../../../hooks/query-hooks/useSessionTypesQuery";
import type { SessionType as SessionTypeItem } from "../../../../types/sessionType";
import { ErrorComponent } from "../../../../components/error/Error";

type SessionTypeProps = {
  onSelectSessionType: (id: number, priceModifier: number) => void;
  selectedSessionTypeId: number | null;
  selectedTimeSlotId: number | null;
  selectedWeeklyScheduleId: number | null;
};

function formatSessionTypeName(name: SessionTypeItem["name"]) {
  if (name === "online") {
    return "Online";
  }

  if (name === "in_person") {
    return "In-Person";
  }

  return "Hybrid";
}

function getSessionTypeDescription(sessionType: SessionTypeItem) {
  if (sessionType.name === "online") {
    return "Google Meet";
  }

  return sessionType.location ?? "";
}

function getSessionTypeIcon(name: SessionTypeItem["name"]) {
  if (name === "online") {
    return GetSlotsSectionsIcons.desktop;
  }

  if (name === "in_person") {
    return GetSlotsSectionsIcons.users;
  }

  return GetSlotsSectionsIcons.intersect;
}

export default function SessionType({
  onSelectSessionType,
  selectedSessionTypeId,
  selectedTimeSlotId,
  selectedWeeklyScheduleId,
}: SessionTypeProps) {
  const { courseId } = useParams();
  const parsedCourseId = Number(courseId);
  const resolvedCourseId = Number.isInteger(parsedCourseId)
    ? parsedCourseId
    : null;
  const sessionTypesQuery = useSessionTypesQuery(
    resolvedCourseId,
    selectedWeeklyScheduleId,
    selectedTimeSlotId,
  );
  if (resolvedCourseId === null) {
    return <ErrorComponent description="failed to load session types" />;
  }

  if (selectedWeeklyScheduleId === null || selectedTimeSlotId === null) {
    return null;
  }

  if (sessionTypesQuery.isPending) {
    return <LoadingDots />;
  }

  if (sessionTypesQuery.isError) {
    return <ErrorComponent description="failed to load session types" />;
  }

  const sessionTypes = sessionTypesQuery.data.data;
  const gridCols =
    sessionTypes.length === 1
      ? "grid-cols-1"
      : sessionTypes.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";
  const warning = GetModdelacons.warning;
  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {sessionTypes.map((schedule: SessionTypeItem) => {
        const Icon = getSessionTypeIcon(schedule.name);
        const sessionTypeDescription = getSessionTypeDescription(schedule);
        const isFullyBooked = schedule.availableSeats === 0;
        const isLowSeats =
          schedule.availableSeats > 0 && schedule.availableSeats < 5;
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2 flex-col items-center">
              <button
                aria-pressed={selectedSessionTypeId === schedule.id}
                className={`w-full rounded-xl px-5 py-3.75 border flex flex-col items-center gap-3 transition-all duration-300 group ${
                  isFullyBooked
                    ? "cursor-auto border-grayscale-100 bg-grayscale-200"
                    : selectedSessionTypeId === schedule.id
                      ? " text-purple-800 bg-purple-200 border-purple-400"
                      : "cursor-pointer text-grayscale-800 border-grayscale-200 hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300"
                }`}
                disabled={isFullyBooked}
                onClick={() =>
                  onSelectSessionType(schedule.id, schedule.priceModifier)
                }
                type="button"
              >
                <div className="flex flex-col gap-1.5 items-center ">
                  <Icon />
                  <h5
                    className={`text-h5 ${
                      isFullyBooked
                        ? "text-grayscale-500"
                        : "text-grayscale-600 group-hover:text-purple-400"
                    }`}
                  >
                    {formatSessionTypeName(schedule.name)}
                  </h5>
                  <p
                    className={`text-helper-regular ${
                      isFullyBooked
                        ? "text-grayscale-500"
                        : "text-grayscale-600 group-hover:text-purple-400"
                    }`}
                  >
                    {sessionTypeDescription}
                  </p>
                </div>

                <p className={`text-body-xs`}>
                  {schedule.priceModifier === 0
                    ? "Included"
                    : `+$${Math.floor(schedule.priceModifier)}`}
                </p>
              </button>
              <div className="text-body-xs text-grayscale-700 flex gap-1 justify-center items-center">
                {isLowSeats ? (
                  <>
                    <img className="w-4 h-4" alt="Warning Icon" src={warning} />
                    <span className="text-helper-warning">
                      {schedule.availableSeats} left
                    </span>
                  </>
                ) : schedule.availableSeats == 0 ? (
                  <>
                    <img className="w-4 h-4" alt="Warning Icon" src={warning} />
                    <span>Fully Booked</span>
                  </>
                ) : (
                  `${schedule.availableSeats} Remainded`
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
