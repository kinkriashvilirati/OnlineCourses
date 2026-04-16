import { useState } from "react";
import type { Enrollment } from "../../../types/enrollment";
import desktop_icon from "../../../assets/icons/schedules-secctions-icon/desktop.svg";
import map_icon from "../../../assets/icons/icon-set/map_pin.svg";
import check_2_icon from "../../../assets/icons/icon-set/check_2.svg";
import clock_icon from "../../../assets/icons/icon-set/Clock.svg";
import calendar_icon from "../../../assets/icons/icon-set/CalendarDots.svg";
import ProgressBar from "../../../components/shared/ProgressBar";
import retake_icon from "../../../assets/icons/icon-set/Retake.svg";
import Rate from "./Rate";

export default function EnroledUserCard({
  enrollment,
}: {
  enrollment: Enrollment;
}) {
  const [isRatingVisible, setIsRatingVisible] = useState(true);
  const progressPercentage = enrollment.progress;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );
  const ENROLED_CLASSES = "text-h4 inline rounded-full p-4";
  const SPAN_CLASSES = "text-body-l grayscale-500";
  const ROWCONTAINER = "flex gap-3";
  const isCompleted = enrollment.completedAt ? true : true;
  const buttonIcon = isCompleted ? retake_icon : check_2_icon;
  const shouldShowRatingPanel = isCompleted && isRatingVisible;
  return (
    <div className="flex flex-col gap-24.25">
      <div className="flex flex-col gap-5.5">
        <div>
          {isCompleted ? (
            <h4
              className={`${ENROLED_CLASSES} text-helper-success bg-helper-successLight`}
            >
              Completed
            </h4>
          ) : (
            <h4 className={`${ENROLED_CLASSES} bg-purple-100 text-purple-400`}>
              Enrolled
            </h4>
          )}
        </div>
        <div className={ROWCONTAINER}>
          <img src={calendar_icon} alt="" />
          <span className={`${SPAN_CLASSES}`}>
            {enrollment.schedule.weeklySchedule.label}
          </span>
        </div>
        <div className={ROWCONTAINER}>
          <img src={clock_icon} alt="" />
          <span className={`${SPAN_CLASSES}`}>
            {enrollment.schedule.timeSlot.label}
          </span>
        </div>
        <div className={ROWCONTAINER}>
          <img src={desktop_icon} alt="" />
          {/* we have a Evening (time) need to delete () */}
          <span className={`${SPAN_CLASSES}`}>
            {enrollment.schedule.sessionType.name.replace(/\s*\([^)]*\)/, "")}
          </span>
        </div>
        <div className={ROWCONTAINER}>
          <img src={map_icon} alt="" />
          {/* need , after the ciy e.g. Tbilisi, */}
          <span className={`${SPAN_CLASSES}`}>
            {enrollment.schedule.location}
          </span>
        </div>
      </div>
      <div className="flex gap-10 flex-col">
        <ProgressBar clampedProgressPercentage={clampedProgressPercentage} />
        <button className="py-4.25 text-button-m flex justify-center items-center text-grayscale-50 gap-2.5 bg-purple-400 rounded-lg hover:bg-pruple-500 transition-all duration-300 cursor-pointer">
          <span> Complete Course</span>
          <img src={buttonIcon} alt="Check Icon" />
        </button>
        {shouldShowRatingPanel ? (
          <Rate setIsRatingVisible={setIsRatingVisible} />
        ) : null}
      </div>
    </div>
  );
}
