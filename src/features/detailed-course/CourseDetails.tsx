import CategoriesIcons from "../../assets/icons/filter-categories-icon/CategoriesIcon";
import calendarDotsIcon from "../../assets/icons/icon-set/CalendarDots.svg";
import clockIcon from "../../assets/icons/icon-set/Clock.svg";
import fullStarIcon from "../../assets/icons/icon-set/full_star.svg";
import type { DetailedCourse } from "../../types/courses-type";

type CourseDetailsProps = {
  data: DetailedCourse;
};

function getAverageRating(data: DetailedCourse) {
  if (data.reviews.length === 0) {
    return null;
  }

  const totalRating = data.reviews.reduce(
    (ratingSum, review) => ratingSum + review.rating,
    0,
  );

  return totalRating / data.reviews.length;
}

function formatAverageRating(averageRating: number | null) {
  return averageRating === null ? "—" : averageRating.toFixed(1);
}

export default function CourseDetails({ data }: CourseDetailsProps) {
  const averageRating = getAverageRating(data);
  const CategoryIcon =
    data.category.icon &&
    CategoriesIcons[data.category.icon.toLocaleLowerCase()];

  return (
    <article className="flex w-full flex-col gap-4.5">
      <div className="flex flex-col gap-4">
        <img
          alt={`${data.title} course preview`}
          className="h-[474.15px] w-full rounded-[10px] object-cover"
          src={data.image}
        />

        <div className="flex gap-4 ">
          <div className="flex w-full items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 text-body-xs text-grayscale-600">
                <img
                  alt="Calendar"
                  className="h-5 w-5"
                  src={calendarDotsIcon}
                />
                <span>{data.durationWeeks} Weeks</span>
              </div>

              <div className="flex items-center gap-1.5 text-body-xs text-grayscale-600">
                <img alt="" className="h-5 w-5" src={clockIcon} />
                <span>{data.hours} Hours</span>
              </div>
            </div>

            <div className="flex items-center  gap-1 text-body-s text-grayscale-600">
              <img alt="" className="h-5 w-5" src={fullStarIcon} />
              <span>{formatAverageRating(averageRating)}</span>
            </div>
          </div>

          <div className="flex ">
            <div className="flex items-center gap-2.5 rounded-xl bg-grayscale-50 px-3 py-2 text-body-s text-grayscale-500 cursor-auto">
              {CategoryIcon ? (
                <CategoryIcon />
              ) : (
                data.category.icon && (
                  <img
                    alt="Category"
                    className="h-7.5 w-7.5 rounded"
                    src={data.category.icon}
                  />
                )
              )}
              <span>{data.category.name}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4.5">
        <div className="flex">
          <div className="flex items-center gap-2.5 rounded-xl border-2 border-grayscale-50 bg-grayscale-50 px-3 py-2 text-body-s text-grayscale-500 cursor-auto">
            {data.instructor.avatar ? (
              <img
                alt={data.instructor.name}
                className="h-7.5 w-7.5 rounded-lg object-cover"
                src={data.instructor.avatar}
              />
            ) : (
              <div className="h-7.5 w-7.5 rounded-lg bg-grayscale-200" />
            )}
            <span>{data.instructor.name}</span>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-h4 text-grayscale-400">Course Description</h2>

          <div className="flex flex-col gap-6">
            <p className="text-body-s leading-7 text-grayscale-600">
              {data.description}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}
