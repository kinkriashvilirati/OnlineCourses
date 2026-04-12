import Course from "./courses-comopnents/Course";
import { mockData } from "./courses-comopnents/mockData";

export default function Courses() {
  const courses = mockData.data.slice(0, 9);

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
