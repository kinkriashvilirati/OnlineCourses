import { ErrorComponent } from "../../../components/error/Error";
import { LoadingDots } from "../../../components/loading/Loading";
import { useAuthModalLifecycle } from "../../../hooks/useAuthModalLifecycle";

import { useEnrollmentsQuery } from "../../../hooks/query-hooks/useEnrollmentsQuery";
import FeaturedLearningCourse from "../../../features/dashboard/continueLearningSectionFolder/FeaturedLearningCourse";

type EnrolledCoursesPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EnrolledCoursesPanel({
  isOpen,
  onClose,
}: EnrolledCoursesPanelProps) {
  const enrollmentsQUery = useEnrollmentsQuery();

  useAuthModalLifecycle(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  const enrolledCourses = enrollmentsQUery.data?.data ?? [];
  return (
    <div className="fixed inset-0 z-60">
      <button
        aria-label="Close enrolled courses panel"
        className="absolute inset-0 bg-grayscale-950/20"
        onClick={onClose}
        type="button"
      />

      <aside className="absolute right-0 top-0 flex h-screen w-full max-w-140 flex-col gap-8 overflow-y-auto border-l border-grayscale-100 bg-grayscale-50 px-8 py-10 shadow-[-20px_0_60px_rgba(20,20,20,0.12)]">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-h2 text-grayscale-950">Enrolled Courses</h2>
            <p className="text-body-s text-grayscale-600">
              Featured courses you can jump into right now
            </p>
          </div>

          <button
            className="cursor-pointer text-button-m text-purple-500 transition-colors duration-200 hover:text-purple-700"
            onClick={onClose}
            type="button"
          >
            Close
          </button>
        </div>

        {enrollmentsQUery.isPending ? <LoadingDots /> : null}

        {enrollmentsQUery.isError ? (
          <ErrorComponent
            description="Please try again in a moment."
            title="Failed to load courses"
          />
        ) : null}

        {enrollmentsQUery.isSuccess && enrolledCourses.length === 0 ? (
          <div className="rounded-xl border border-grayscale-100 bg-grayscale-50 px-8 py-16 text-center">
            <p className="text-h4 text-grayscale-800">No courses yet</p>
          </div>
        ) : null}

        {enrollmentsQUery.isSuccess && enrolledCourses.length > 0 ? (
          <div className="flex flex-col gap-6">
            {enrolledCourses.map((enrollemnt) => (
              <FeaturedLearningCourse
                enrollment={enrollemnt}
                key={enrollemnt.id}
              />
            ))}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
