import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import CourseCard from "../../../../components/CourseCard";
import type { Course as CourseData } from "../../../../types/courses-type";

type CourseProps = {
  course: CourseData;
};

export default function Course({ course }: CourseProps) {
  const Icon = CategoriesIcons[course.category.icon.toLocaleLowerCase()];
  // category.icon && CategoriesIcons[category.icon.toLocaleLowerCase()];
  return (
    <article className="flex w-full flex-col rounded-xl border border-grayscale-100 bg-grayscale-50 p-5 gap-6  justify-between hover:shadow-[0_0_25px_0_rgba(138,130,212,0.1)] active:shadow-[0_0_25px_0_rgba(138,130,212,0.15)] transition-all duration-300 h-full">
      <CourseCard course={course} priceLayout="column">
        <img
          alt={`${course.title} course preview`}
          className="h-45.25 w-full rounded-2xl object-cover"
          src={course.image}
        />
        <p className="text-body-xs text-grayscale-300">
          {course.instructor.name} | {course.durationWeeks} Weeks
        </p>
        <p className="text-body-s bg-grayscale-100 text-grayscale-600 flex gap-2 px-3 py-4 rounded-xl w-fit">
          {Icon && <Icon />} {course.category.name}
        </p>
      </CourseCard>
    </article>
  );
}
