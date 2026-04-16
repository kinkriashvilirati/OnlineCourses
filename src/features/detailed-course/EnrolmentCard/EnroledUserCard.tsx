import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { Enrollment } from "../../../types/enrollment";
import desktop_icon from "../../../assets/icons/schedules-secctions-icon/desktop.svg";
import map_icon from "../../../assets/icons/icon-set/map_pin.svg";
import check_2_icon from "../../../assets/icons/icon-set/check_2.svg";
import clock_icon from "../../../assets/icons/icon-set/Clock.svg";
import calendar_icon from "../../../assets/icons/icon-set/CalendarDots.svg";
import ProgressBar from "../../../components/shared/ProgressBar";
import retake_icon from "../../../assets/icons/icon-set/Retake.svg";
import Rate from "./Rate";
import { useCompleteEnrollmentMutation } from "../../../hooks/mutation-hooks/useCompleteEnrollmentMutation";
import { useCreateReviewMutation } from "../../../hooks/mutation-hooks/useCreateReviewMutation";
import { useDeleteEnrollmentMutation } from "../../../hooks/mutation-hooks/useDeleteEnrollmentMutation";

export default function EnroledUserCard({
  courseId,
  enrollment,
  isRated,
}: {
  courseId: number;
  enrollment: Enrollment;
  isRated: boolean;
}) {
  const [isRatingVisible, setIsRatingVisible] = useState(true);
  const completeEnrollmentMutation = useCompleteEnrollmentMutation();
  const createReviewMutation = useCreateReviewMutation();
  const deleteEnrollmentMutation = useDeleteEnrollmentMutation();
  const progressPercentage = enrollment.progress;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );
  const ENROLED_CLASSES = "text-h4 inline rounded-full p-4";
  const SPAN_CLASSES = "text-body-l grayscale-500";
  const ROWCONTAINER = "flex gap-3";
  const isCompleted = enrollment.completedAt ? true : false;
  const isButtonLocked = isCompleted
    ? deleteEnrollmentMutation.isPending || deleteEnrollmentMutation.isSuccess
    : completeEnrollmentMutation.isPending || completeEnrollmentMutation.isSuccess;
  const buttonIcon = isCompleted ? retake_icon : check_2_icon;
  const shouldShowRatingPanel =
    isCompleted &&
    !isRated &&
    isRatingVisible &&
    !createReviewMutation.isSuccess;
  const actionErrorMessage = completeEnrollmentMutation.isError
    ? isAxiosError(completeEnrollmentMutation.error)
      ? (completeEnrollmentMutation.error.response?.data?.message ??
        "Failed to complete course.")
      : "Failed to complete course."
    : deleteEnrollmentMutation.isError
      ? isAxiosError(deleteEnrollmentMutation.error)
        ? (deleteEnrollmentMutation.error.response?.data?.message ??
          "Failed to retake course.")
        : "Failed to retake course."
      : null;

  function handleEnrollmentAction() {
    if (isCompleted) {
      deleteEnrollmentMutation.mutate({
        courseId,
        enrollmentId: enrollment.id,
      });
      return;
    }

    completeEnrollmentMutation.mutate(enrollment.id);
  }

  const buttonLabel = isCompleted
    ? deleteEnrollmentMutation.isPending
      ? "Retaking..."
      : deleteEnrollmentMutation.isSuccess
        ? "Updating..."
        : "Retake Course"
    : completeEnrollmentMutation.isPending
      ? "Completing..."
      : completeEnrollmentMutation.isSuccess
        ? "Updating..."
        : "Complete Course";
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
        <button
          className="py-4.25 text-button-m flex justify-center items-center text-grayscale-50 gap-2.5 bg-purple-400 rounded-lg hover:bg-pruple-500 transition-all duration-300 cursor-pointer disabled:bg-purple-100 disabled:text-purple-300 disabled:cursor-auto"
          disabled={isButtonLocked}
          onClick={handleEnrollmentAction}
          type="button"
        >
          <span>{buttonLabel}</span>
          <img src={buttonIcon} alt="Check Icon" />
        </button>
        {actionErrorMessage ? (
          <p className="text-body-xs text-helper-error">
            {actionErrorMessage}
          </p>
        ) : null}
        {shouldShowRatingPanel ? (
          <Rate
            isSubmitting={createReviewMutation.isPending}
            onRate={(rating) => {
              createReviewMutation.mutate(
                {
                  courseId,
                  rating,
                },
                {
                  onError: (error) => {
                    const message = isAxiosError(error)
                      ? (error.response?.data?.message ??
                        "Failed to submit your rating.")
                      : "Failed to submit your rating.";

                    toast.error(message);
                  },
                  onSuccess: () => {
                    setIsRatingVisible(false);
                    toast.success("Thanks for rating this course!");
                  },
                },
              );
            }}
            setIsRatingVisible={setIsRatingVisible}
          />
        ) : null}
      </div>
    </div>
  );
}
