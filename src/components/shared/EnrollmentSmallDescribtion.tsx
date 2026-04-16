import desktop_icon from "../../assets/icons/schedules-secctions-icon/desktop.svg";
import map_icon from "../../assets/icons/icon-set/map_pin.svg";
import clock_icon from "../../assets/icons/icon-set/Clock.svg";
import calendar_icon from "../../assets/icons/icon-set/CalendarDots.svg";
import type { Enrollment } from "../../types/enrollment";
export default function EnrollmentSmallDescribtion({
  enrollment,
  span_classes,
  row_cont_classes,
}: {
  enrollment: Enrollment;
  span_classes: string;
  row_cont_classes: string;
}) {
  return (
    <>
      <div className={row_cont_classes}>
        <img src={calendar_icon} alt="" />
        <span className={span_classes}>
          {enrollment.schedule.weeklySchedule.label}
        </span>
      </div>
      <div className={row_cont_classes}>
        <img src={clock_icon} alt="" />
        <span className={span_classes}>
          {enrollment.schedule.timeSlot.label}
        </span>
      </div>
      <div className={row_cont_classes}>
        <img src={desktop_icon} alt="" />
        <span className={span_classes}>
          {enrollment.schedule.sessionType.name.replace(/\s*\([^)]*\)/, "")}
        </span>
      </div>
      {enrollment.schedule.location && (
        <div className={row_cont_classes}>
          <img src={map_icon} alt="" />
          <span className={span_classes}>{enrollment.schedule.location}</span>
        </div>
      )}
    </>
  );
}
