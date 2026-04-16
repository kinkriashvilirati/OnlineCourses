import GetModdelacons from "../../../../assets/icons/modalIcons/GetModellacons";
import GetSlotsSectionsIcons from "../../../../assets/icons/schedules-secctions-icon/GetSlotsSectionsIcons";
type SlotItem = {
  id: number;
  courseScheduleId: number;
  name: string;
  priceModifier: string; // backend gives string (e.g. "0.00")
  availableSeats: number;
  location: string | null;
};
const MOCK: SlotItem[] = [
  {
    id: 1,
    courseScheduleId: 5,
    name: "online",
    priceModifier: "0.00",
    availableSeats: 0,
    location: null,
  },
  {
    id: 2,
    courseScheduleId: 5,
    name: "online",
    priceModifier: "0.00",
    availableSeats: 0,
    location: null,
  },
  {
    id: 3,
    courseScheduleId: 5,
    name: "online",
    priceModifier: "0.00",
    availableSeats: 30,
    location: null,
  },
];
export default function SessionType() {
  /**
   * icons:
  cloud_sun,
  desktop,
  intersect,
  moon,
  sun,
  users,
   */
  const gridCols =
    MOCK.length === 1
      ? "grid-cols-1"
      : MOCK.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";
  const Icon = GetSlotsSectionsIcons.desktop;
  const warning = GetModdelacons.warning;
  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {MOCK.map((schedule: SlotItem) => {
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2 flex-col items-center">
              <div className="w-full rounded-xl border-grayscale-200 px-5 py-3.75 border flex flex-col items-center gap-3 transition-all duration-300 group hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300 cursor-pointer">
                <div className="flex flex-col gap-1.5 items-center ">
                  <Icon />
                  <h5 className="text-h5 text-grayscale-600 group-hover:text-purple-400">
                    {schedule.name}
                  </h5>
                  <p className="text-helper-regular text-grayscale-600 group-hover:text-purple-400">
                    Google Meet
                  </p>
                </div>

                <p className="text-body-xs text-purple-400">
                  {schedule.priceModifier === "0.00"
                    ? "Included"
                    : `price ${0}`}
                </p>
              </div>
              <div className="text-body-xs text-grayscale-700 flex gap-1 justify-center items-center">
                {schedule.availableSeats > 3 ? (
                  `${schedule.availableSeats} Remainded`
                ) : (
                  <>
                    <img className="w-4 h-4" alt="Warning Icon" src={warning} />
                    <span>{schedule.availableSeats} left</span>
                  </>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
