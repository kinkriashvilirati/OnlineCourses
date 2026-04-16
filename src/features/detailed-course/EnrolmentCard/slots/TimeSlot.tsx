import GetSlotsSectionsIcons from "../../../../assets/icons/schedules-secctions-icon/GetSlotsSectionsIcons";
type SlotItem = {
  id: number;
  label: string;
  startTime: string;
  endTime: string; // backend gives string (e.g. "0.00")
};
const MOCK: SlotItem[] = [
  {
    id: 1,
    label: "Morning (9:00 AM - 11:00 AM)",
    startTime: "09:00:00",
    endTime: "11:00:00",
  },
  {
    id: 3,
    label: "Evening (6:00 PM - 8:00 PM)",
    startTime: "18:00:00",
    endTime: "20:00:00",
  },
];
export default function TimeSlot() {
  const gridCols =
    MOCK.length === 1
      ? "grid-cols-1"
      : MOCK.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";
  /**
   * icons:
  cloud_sun,
  desktop,
  intersect,
  moon,
  sun,
  users,
   */
  const Icon = GetSlotsSectionsIcons.cloud_sun;
  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {MOCK.map((schedule: SlotItem) => {
        const [title, time] = schedule.label.split(" (");
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2  items-center">
              <div className="text-grayscale-500 w-full rounded-xl border-grayscale-200 px-5 py-3.75 border flex  items-center gap-3 transition-all duration-300 group hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300 cursor-pointer">
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
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
