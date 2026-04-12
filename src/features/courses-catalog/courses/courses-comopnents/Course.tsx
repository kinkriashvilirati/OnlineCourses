import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import CourseCard from "../../../../components/CourseCard";
import type { Course as CourseData } from "../../courses-catalog-type";

type CourseProps = {
  course: CourseData;
};

export default function Course({ course }: CourseProps) {
  const Icon = CategoriesIcons[course.category.name.toLocaleLowerCase()];
  // category.icon && CategoriesIcons[category.icon.toLocaleLowerCase()];
  return (
    <article className="flex w-full flex-col rounded-xl border border-grayscale-100 bg-grayscale-50 p-5 gap-6  justify-between hover:shadow-[0_0_25px_0_rgba(138,130,212,0.1)] active:shadow-[0_0_25px_0_rgba(138,130,212,0.15)] transition-all duration-300">
      <CourseCard course={course} priceLayout="column">
        <img
          alt={`${course.title} course preview`}
          className="h-45.25 w-full rounded-2xl object-cover"
          src={course.image}
        />
        <p className="text-body-xs text-grayscale-300">
          {course.instructor.name} | {course.durationWeeks} Weeks
        </p>
        <p className="text-body-s text-grayscale-600 flex gap-2 pl-3">
          {Icon && <Icon />} {course.category.name}
        </p>
      </CourseCard>
    </article>
  );
}
