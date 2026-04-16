import { useState } from "react";
import { isAxiosError } from "axios";
import { toast } from "sonner";
import type { Enrollment } from "../../../types/enrollment";
import check_2_icon from "../../../assets/icons/icon-set/check_2.svg";
import ProgressBar from "../../../components/shared/ProgressBar";
import retake_icon from "../../../assets/icons/icon-set/Retake.svg";
import CourseTakeModal from "../CourseTakeModal";
import Rate from "./Rate";
import { useCompleteEnrollmentMutation } from "../../../hooks/mutation-hooks/useCompleteEnrollmentMutation";
import { useCreateReviewMutation } from "../../../hooks/mutation-hooks/useCreateReviewMutation";
import { useDeleteEnrollmentMutation } from "../../../hooks/mutation-hooks/useDeleteEnrollmentMutation";
import EnrollmentSmallDescribtion from "../../../components/shared/EnrollmentSmallDescribtion";

type EnroledUserCardProps = {
  courseId: number;
  courseTitle: string;
  enrollment: Enrollment;
  isRated: boolean;
};

export default function EnroledUserCard({
  courseId,
  courseTitle,
  enrollment,
  isRated,
}: EnroledUserCardProps) {
  const SPAN_CLASSES = "text-body-l grayscale-500";
  const ROWCONTAINER = "flex gap-3";
  const isCompleted = Boolean(enrollment.completedAt);
  const [isCompletionModalVisible, setIsCompletionModalVisible] = useState(
    isCompleted && !isRated,
  );
  const completeEnrollmentMutation = useCompleteEnrollmentMutation();
  const createReviewMutation = useCreateReviewMutation();
  const deleteEnrollmentMutation = useDeleteEnrollmentMutation();
  const progressPercentage = enrollment.progress;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );
  const ENROLED_CLASSES = "text-h4 inline rounded-full p-4";

  const isButtonLocked = isCompleted
    ? deleteEnrollmentMutation.isPending || deleteEnrollmentMutation.isSuccess
    : completeEnrollmentMutation.isPending ||
      completeEnrollmentMutation.isSuccess;
  const buttonIcon = isCompleted ? retake_icon : check_2_icon;
  const shouldShowCompletionModal =
    isCompletionModalVisible &&
    (isCompleted || completeEnrollmentMutation.isSuccess);
  const shouldShowRatingPanel = !isRated && !createReviewMutation.isSuccess;
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

    completeEnrollmentMutation.mutate(enrollment.id, {
      onSuccess: () => {
        setIsCompletionModalVisible(true);
      },
    });
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
        <EnrollmentSmallDescribtion
          span_classes={SPAN_CLASSES}
          row_cont_classes={ROWCONTAINER}
          enrollment={enrollment}
        />
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
          <p className="text-body-xs text-helper-error">{actionErrorMessage}</p>
        ) : null}
      </div>

      <CourseTakeModal
        actions={
          <button
            className="w-full cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-500 px-3 py-2 text-button-s text-grayscale-50 transition-all duration-300 hover:bg-purple-600"
            onClick={() => setIsCompletionModalVisible(false)}
            type="button"
          >
            Done
          </button>
        }
        description={
          <p>
            You've completed{" "}
            <span className="font-semibold">"{courseTitle}"</span> Course!
          </p>
        }
        icon="success"
        isOpen={shouldShowCompletionModal}
        onClose={() => setIsCompletionModalVisible(false)}
        title="Congratulations!"
      >
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
                    toast.success("Thanks for rating this course!");
                  },
                },
              );
            }}
            panelClassName="gap-6 bg-transparent p-0"
            showCloseButton={false}
          />
        ) : null}
      </CourseTakeModal>
    </div>
  );
}
