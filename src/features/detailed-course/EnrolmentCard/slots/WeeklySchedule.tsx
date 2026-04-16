type SlotItem = {
  id: number;
  label: string;
  days: string[];
};
const MOCK: SlotItem[] = [
  {
    id: 1,
    label: "Monday - Wednesday",
    days: ["monday", "wednesday"],
  },
  {
    id: 2,
    label: "Tuesday - Thursday",
    days: ["tuesday", "thursday"],
  },
  {
    id: 3,
    label: "Friday - Saturday",
    days: ["friday", "saturday"],
  },
  {
    id: 4,
    label: "Weekend Only",
    days: ["saturday", "sunday"],
  },
];
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
export default function WeeklySchedule() {
  const gridCols =
    MOCK.length === 1
      ? "grid-cols-1"
      : MOCK.length === 2
        ? "grid-cols-2"
        : "grid-cols-3";
  return (
    <div className={`grid gap-1 w-full ${gridCols}`}>
      {MOCK.map((schedule: SlotItem) => {
        return (
          <div key={schedule.id} className=" w-full  ">
            <div className="flex w-full gap-2  items-center">
              <div className="text-grayscale-800 w-full rounded-xl border-grayscale-200 px-5 py-3.75 border flex  items-center gap-3 transition-all duration-300 group hover:bg-purple-100 hover:text-purple-400 hover:border-purple-300 cursor-pointer">
                <div className="flex flex-col">
                  <h5 className="text-h5 text-body-xs">
                    {shortenDayLabel(schedule.label)}
                  </h5>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
