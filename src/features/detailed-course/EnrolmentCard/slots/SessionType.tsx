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
    availableSeats: 0,
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
  const Icon = GetSlotsSectionsIcons.desktop;

  return (
    <div className="flex  gap-1 w-full">
      {MOCK.map((schedule: SlotItem) => (
        <>
          <div className="flex w-full border gap-2 flex-col items-center">
            <div className="w-full rounded-xl border-grayscale-200 px-5 py-3.75 border flex flex-col items-center gap-3">
              <div className="flex flex-col gap-1.5 items-center">
                <Icon />
                <h5 className="text-h5 text-grayscale-600">
                  {schedule.location}
                </h5>
                <p className="text-helper-regular text-grayscale-600">
                  Google Meat
                </p>
              </div>

              <p className="text-body-xs text-purple-400">Included</p>
            </div>
            <p className="text-body-xs text-grayscale-700">remained</p>
          </div>
        </>
      ))}
    </div>
  );
}
