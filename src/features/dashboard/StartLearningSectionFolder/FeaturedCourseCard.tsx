import CourseCard from "../../../components/CourseCard";
import type { Course } from "../../../types/courses-type";

type FeaturedCourseCardProps = {
  course: Course;
};

export default function FeaturedCourseCard({
  course,
}: FeaturedCourseCardProps) {
  return (
    <article className="flex w-full flex-col rounded-xl border border-grayscale-100 bg-grayscale-50 p-5 gap-6 justify-between hover:shadow-[0_0_25px_0_rgba(138,130,212,0.1)] active:shadow-[0_0_25px_0_rgba(138,130,212,0.15)] transition-all duration-300">
      <CourseCard course={course}>
        <img
          alt={`${course.title} course preview`}
          className="h-65.5 max-laptop:h-50 max-tablet:h-60 w-full rounded-2xl object-cover"
          src={course.image}
        />
        <p className="text-body-xs text-grayscale-500">
          Lecturer {course.instructor.name}
        </p>
        <p className="text-body-s text-grayscale-500">{course.description}</p>
      </CourseCard>
    </article>
  );
}
