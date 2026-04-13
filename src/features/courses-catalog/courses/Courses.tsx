import { ErrorComponent } from "../../../components/error/Error";
import { LoadingDots } from "../../../components/loading/Loading";
import { useCoursesQuery } from "../../../hooks/query-hooks/useCoursesQuery";
import Course from "./courses-comopnents/Course";

export default function Courses() {
  const coursesQuery = useCoursesQuery();

  if (coursesQuery.isPending) {
    return <LoadingDots />;
  }

  if (coursesQuery.isError) {
    return <ErrorComponent />;
  }

  if (!coursesQuery.data) {
    return null;
  }

  return (
    <ul className="m-0  w-full grid list-none grid-cols-3 gap-6 p-0">
      {coursesQuery.data.data.map((course) => (
        <li key={course.id}>
          <Course course={course} />
        </li>
      ))}
    </ul>
  );
}
