import { Link } from "react-router";
import fullStarIcon from "../../../assets/icons/icon-set/full_star.svg";
import type { FeaturedCourse } from "../../../api/courses/featuredCourses";

type FeaturedCourseCardProps = {
  course: FeaturedCourse;
};

function formatBasePrice(basePrice: number) {
  return Math.floor(basePrice);
}

function formatAverageRating(avgRating: number | null) {
  return avgRating === null ? "—" : avgRating.toFixed(1);
}

export default function FeaturedCourseCard({
  course,
}: FeaturedCourseCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl border border-grayscale-100 bg-grayscale-50 p-5 gap-6  justify-between">
      <div className="flex flex-col gap-4">
        <img
          alt={`${course.title} course preview`}
          className="h-65.5 w-full rounded-2xl object-cover"
          src={course.image}
        />

        <div className=" flex items-center justify-between gap-4">
          <p className="text-body-xs text-grayscale-500">
            Lecturer {course.instructor.name}
          </p>

          <div className="flex items-center gap-1.5 text-body-s text-grayscale-600">
            <img alt="" className="h-5 w-5" src={fullStarIcon} />
            <span>{formatAverageRating(course.avgRating)}</span>
          </div>
        </div>

        <h3 className="text-h3 text-grayscale-950">{course.title}</h3>

        <p className="text-body-s text-grayscale-500">{course.description}</p>
      </div>

      <div className=" flex items-end justify-between gap-6 ">
        <div className="flex gap-2 items-center">
          <span className="text-helper-medium text-grayscale-400">
            Starting from
          </span>
          <h2 className="text-h2 text-grayscale-900">
            ${formatBasePrice(course.basePrice)}
          </h2>
        </div>

        <Link
          className="button-primary px-6.25 py-4.25 text-button-m"
          to={`/courses/${course.id}`}
        >
          Details
        </Link>
      </div>
    </article>
  );
}
