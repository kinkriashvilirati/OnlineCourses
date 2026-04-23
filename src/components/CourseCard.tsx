import { Children, type ReactNode } from "react";
import { Link } from "react-router";
import fullStarIcon from "../assets/icons/icon-set/full_star.svg";
import type { Course } from "../types/courses-type";

type CourseCardProps = {
  children?: ReactNode;
  course: Course;
  priceLayout?: "row" | "column";
};

function formatBasePrice(basePrice: number) {
  return Math.floor(basePrice);
}

function formatAverageRating(avgRating: number | null) {
  return avgRating === null ? "—" : avgRating.toFixed(1);
}

export default function CourseCard({
  children,
  course,
  priceLayout = "row",
}: CourseCardProps) {
  const childItems = Children.toArray(children);
  const imgMeta = childItems[0] ?? null;
  const topMeta = childItems[1] ?? null;
  const secondaryMeta = childItems[2] ?? null;

  return (
    <>
      <div className="flex flex-col gap-4">
        {imgMeta}
        <div className="flex items-center justify-between gap-4">
          {topMeta}

          <div className="flex shrink-0 items-center gap-1.5 text-body-s text-grayscale-600">
            <img alt="" className="h-5 w-5" src={fullStarIcon} />
            <span>{formatAverageRating(course.avgRating)}</span>
          </div>
        </div>

        <h3 className="text-h3 text-grayscale-950">{course.title}</h3>

        {secondaryMeta}
      </div>

      <div className="flex items-end justify-between gap-6 max-mobile:flex-col max-mobile:items-stretch max-mobile:gap-4">
        <div
          className={`flex ${
            priceLayout === "column"
              ? "flex-col items-start gap-0.5"
              : "items-center gap-2 max-mobile:flex-col max-mobile:items-start max-mobile:gap-0.5"
          }`}
        >
          <span className="text-helper-medium text-grayscale-400">
            Starting from
          </span>
          <h2 className="text-h2 text-grayscale-900">
            ${formatBasePrice(course.basePrice)}
          </h2>
        </div>

        <Link
          className="button-primary px-6.25 py-4.25 text-button-m max-mobile:w-full max-mobile:text-center"
          to={`/courses/${course.id}`}
        >
          Details
        </Link>
      </div>
    </>
  );
}
