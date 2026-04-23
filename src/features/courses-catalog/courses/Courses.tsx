import type { Course as CourseType } from "../../../types/courses-type";
import Course from "./courses-comopnents/Course";

type CoursesProps = {
  courses: CourseType[];
};

export default function Courses({ courses }: CoursesProps) {
  return (
    <ul className="m-0 w-full grid list-none grid-cols-3 max-tabletL:grid-cols-2 max-laptop:grid-cols-2 max-laptopS:grid-cols-3 max-mobile:grid-cols-1 gap-6 p-0">
      {courses.map((course) => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </ul>
  );
}
