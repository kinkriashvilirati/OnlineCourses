import type { Course as CourseType } from "../courses-catalog-type";
import Course from "./courses-comopnents/Course";

type CoursesProps = {
  courses: CourseType[];
};

export default function Courses({ courses }: CoursesProps) {
  return (
    <ul className="m-0  w-full grid list-none grid-cols-3 gap-6 p-0">
      {courses.map((course) => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </ul>
  );
}
