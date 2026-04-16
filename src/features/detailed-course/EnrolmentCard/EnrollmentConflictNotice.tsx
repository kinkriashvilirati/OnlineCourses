type EnrollmentConflictNoticeProps = {
  conflictCourseName: string;
  conflictSchedule: string;
  isContinuing: boolean;
  onCancel: () => void;
  onContinueAnyway: () => void;
};

function formatConflictSchedule(conflictSchedule: string) {
  const [days, time] = conflictSchedule.split(" at ");

  if (!days || !time) {
    return conflictSchedule;
  }

  return `${days} at ${time}`;
}

export default function EnrollmentConflictNotice({
  conflictCourseName,
  conflictSchedule,
  isContinuing,
  onCancel,
  onContinueAnyway,
}: EnrollmentConflictNoticeProps) {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-helper-warning bg-helper-warningLight/30 p-5">
      <div className="flex flex-col gap-2 text-center">
        <p className="text-body-s text-grayscale-700">
          You are already enrolled in {conflictCourseName} with the same
          schedule: {formatConflictSchedule(conflictSchedule)}
        </p>
        <p className="text-body-s text-grayscale-700">
          Are you sure you want to continue?
        </p>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="w-full cursor-pointer rounded-xl border border-grayscale-200 bg-grayscale-50 px-5 py-4 text-button-m text-grayscale-700 transition-all duration-300 hover:bg-grayscale-100 disabled:cursor-auto disabled:bg-grayscale-100 disabled:text-grayscale-400"
          disabled={isContinuing}
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="w-full cursor-pointer rounded-xl border-2 border-purple-300 bg-purple-100 px-5 py-4 text-button-m text-purple-600 transition-all duration-300 hover:bg-purple-200 disabled:cursor-auto disabled:border-purple-100 disabled:bg-purple-50 disabled:text-purple-200"
          disabled={isContinuing}
          onClick={onContinueAnyway}
          type="button"
        >
          {isContinuing ? "Continuing..." : "Continue Anyway"}
        </button>
      </div>
    </div>
  );
}
