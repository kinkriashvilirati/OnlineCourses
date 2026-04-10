import fullStarIcon from "../../../assets/icons/icon-set/full_star.svg";
import type { Enrollment } from "../../../types/enrollment";

type FeaturedLearningCourseProps = {
  enrollment: Enrollment;
};

function formatAverageRating(avgRating: number | null) {
  return avgRating === null ? "—" : avgRating.toFixed(1);
}

export default function FeaturedLearningCourse({
  enrollment,
}: FeaturedLearningCourseProps) {
  const progressPercentage = enrollment.progress;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );

  return (
    <article className="bg-grayscale-50 min-h-5 flex w-full flex-col rounded-xl border border-grayscale-100 p-5 gap-2 justify-between">
      <div className="flex">
        <img
          alt={`${enrollment.course.title} course preview`}
          className="h-30.75 max-w-35 shrink-0 rounded-2xl object-cover"
          src={enrollment.course.image}
        />

        <div className="flex  flex-1 flex-col gap-2.25 pl-4 pr-1">
          <div className="flex items-start justify-between ">
            <p className="text-body-xs text-grayscale-400">
              Lecturer {enrollment.course.instructor.name}
            </p>

            <div className="flex items-center gap-1.5 text-body-s text-grayscale-600">
              <img alt="" className="h-5 w-5" src={fullStarIcon} />
              <span>{formatAverageRating(enrollment.course.avgRating)}</span>
            </div>
          </div>

          <h3 className=" text-h4  text-grayscale-900">
            {enrollment.course.title}
          </h3>
        </div>
      </div>

      <div className="flex items-end justify-between gap-10">
        <div className="flex flex-1 flex-col gap-3">
          <p className="text-body-m text-grayscale-900">
            {clampedProgressPercentage}% Complete
          </p>

          <div className="h-4 w-full overflow-hidden rounded-full bg-purple-100">
            <div
              className="h-full rounded-full bg-purple-500 transition-all duration-500"
              style={{ width: `${clampedProgressPercentage}%` }}
            />
          </div>
        </div>

        <button
          className="button-outline min-w-33 rounded-2xl px-8 py-4 text-button-m"
          type="button"
        >
          View
        </button>
      </div>
    </article>
  );
}
