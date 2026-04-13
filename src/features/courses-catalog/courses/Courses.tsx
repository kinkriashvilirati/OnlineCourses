import type { Course as CourseType } from "../courses-catalog-type";
import Course from "./courses-comopnents/Course";
type PropsType = {
  courses: CourseType[];
};

export default function Courses({ courses }: PropsType) {
  return (
    <ul className="m-0  w-full grid list-none grid-cols-3 gap-6 p-0">
      {courses.map((course: CourseType) => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </ul>
  );
}
