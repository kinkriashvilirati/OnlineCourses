import { Link } from "react-router";
import fullStarIcon from "../../../assets/icons/icon-set/full_star.svg";
import ProgressBar from "../../../components/shared/ProgressBar";
import type { Enrollment } from "../../../types/enrollment";
import { type ReactNode } from "react";

type FeaturedLearningCourseProps = {
  enrollment: Enrollment;
  children?: ReactNode;
};

function formatAverageRating(avgRating: number | null) {
  return avgRating === null ? "—" : avgRating.toFixed(1);
}

export default function FeaturedLearningCourse({
  enrollment,
  children,
}: FeaturedLearningCourseProps) {
  const course = enrollment.course;

  if (!course) {
    return null;
  }

  const progressPercentage = enrollment.progress;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );

  return (
    <article
      className={`bg-grayscale-50 max-w-130 min-h-5 flex w-full flex-col rounded-xl border border-grayscale-100 p-5 gap-2 justify-between hover:border-purple-200 active:border-purple-300 transition-all duration-300 ${children && "max-w-full"}`}
    >
      <div className="flex">
        <img
          alt={`${course.title} course preview`}
          className={`w-47.75 rounded-2xl object-cover ${children && "w-67.25 h-47.75 max-w-1000"}`}
          src={course.image}
        />

        <div className="flex  flex-1 flex-col gap-2.25 pl-4 pr-1">
          <div className="flex items-start justify-between ">
            <p className="text-body-xs text-grayscale-400">
              Lecturer {course.instructor.name}
            </p>

            <div className="flex items-center gap-1.5 text-body-s text-grayscale-600">
              <img alt="" className="h-5 w-5" src={fullStarIcon} />
              <span>{formatAverageRating(course.avgRating)}</span>
            </div>
          </div>

          <h3 className=" text-h4  text-grayscale-900">{course.title}</h3>
          {children}
        </div>
      </div>
      <div className="flex items-end justify-between gap-10">
        <ProgressBar clampedProgressPercentage={clampedProgressPercentage} />

        <Link
          className="button-outline min-w-33 rounded-2xl px-8 py-4 text-button-m flex justify-center"
          type="button"
          to={`courses/${enrollment.course.id}`}
        >
          View
        </Link>
      </div>
    </article>
  );
}
