import { ErrorComponent } from "../../../components/error/Error";
import { LoadingDots } from "../../../components/loading/Loading";
import { useAuthModalLifecycle } from "../../../hooks/useAuthModalLifecycle";

import { useEnrollmentsQuery } from "../../../hooks/query-hooks/useEnrollmentsQuery";
import FeaturedLearningCourse from "../../../features/dashboard/continueLearningSectionFolder/FeaturedLearningCourse";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import EnrollmentSmallDescribtion from "../../shared/EnrollmentSmallDescribtion";

type EnrolledCoursesPanelProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function EnrolledCoursesPanel({
  isOpen,
  onClose,
}: EnrolledCoursesPanelProps) {
  const SPAN_CLASSES = "text-helper-m grayscale-400";
  const ROWCONTAINER = "flex gap-1";
  const enrollmentsQUery = useEnrollmentsQuery();

  useAuthModalLifecycle(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  const enrolledCourses = enrollmentsQUery.data?.data ?? [];
  const safeEnrollments = enrolledCourses.filter(
    (enrollment) => enrollment?.course?.title,
  );
  return (
    <div className="fixed inset-0 z-60 gap-10">
      <button
        aria-label="Close enrolled courses panel"
        className="absolute inset-0 bg-grayscale-950/20"
        onClick={onClose}
        type="button"
      />
      {enrollmentsQUery.isPending ? <LoadingDots /> : null}

      {enrollmentsQUery.isError ? (
        <ErrorComponent
          description="Please try again in a moment."
          title="Failed to load courses"
        />
      ) : null}
      <aside className="absolute right-0 top-0 flex h-screen w-full max-w-195 flex-col gap-8 overflow-y-auto border-l border-grayscale-100  px-8 py-10 bg-grayscale-100 ">
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex justify-between w-full items-baseline">
            <h3 className="text-h3 text-grayscale-950">Enrolled Courses</h3>
            <span>Total enrollments: {safeEnrollments.length}</span>
          </div>

          <button
            className="cursor-pointer absolute text-button-m text-purple-500 transition-colors duration-200 hover:text-purple-700 top-2 right-2"
            onClick={onClose}
            type="button"
          >
            <FontAwesomeIcon
              className="text-grayscale-500 hover:text-grayscale-700 duration:300 transition-all"
              icon={faX}
            />
          </button>
        </div>

        {enrollmentsQUery.isSuccess && safeEnrollments.length === 0 ? (
          <div className="rounded-xl border border-grayscale-100 bg-grayscale-50 px-8 py-16 text-center">
            <p className="text-h4 text-grayscale-800">No courses yet</p>
          </div>
        ) : null}

        {enrollmentsQUery.isSuccess && safeEnrollments.length > 0 ? (
          <div className="flex flex-col  px-4 items-center gap-5">
            {safeEnrollments.map((enrollemnt) => (
              <FeaturedLearningCourse
                enrollment={enrollemnt}
                key={enrollemnt.id}
              >
                <EnrollmentSmallDescribtion
                  span_classes={SPAN_CLASSES}
                  row_cont_classes={ROWCONTAINER}
                  enrollment={enrollemnt}
                />
              </FeaturedLearningCourse>
            ))}
          </div>
        ) : null}
      </aside>
    </div>
  );
}
