import { useParams } from "react-router";
import { ErrorComponent } from "../components/error/Error";
import { LoadingDots } from "../components/loading/Loading";
import CourseDetails from "../features/detailed-course/CourseDetails";
import EnrolmentCard from "../features/detailed-course/EnrolmentCard/EnrolmentCard";
import EnrollmentAccessNotice from "../features/detailed-course/EnrollmentAccessNotice";
import Header from "../features/detailed-course/Navigation";
import { useDetailedCourseQuery } from "../hooks/query-hooks/useDetailedCourseQuery";
import EnroledUserCard from "../features/detailed-course/EnrolmentCard/EnroledUserCard";

export default function DetailedCourse() {
  const { courseId } = useParams();
  const parsedCourseId = Number(courseId);
  const resolvedCourseId = Number.isInteger(parsedCourseId)
    ? parsedCourseId
    : null;
  const detailedCourseQuery = useDetailedCourseQuery(resolvedCourseId);

  if (resolvedCourseId === null) {
    return (
      <main className="mt-40">
        <ErrorComponent
          description="The requested course link is invalid."
          title="Failed to load course"
        />
      </main>
    );
  }

  if (detailedCourseQuery.isPending) {
    return (
      <main className="mt-40">
        <LoadingDots />
      </main>
    );
  }

  if (detailedCourseQuery.isError || !detailedCourseQuery.data) {
    return (
      <main className="mt-40">
        <ErrorComponent
          description="Please try again in a moment."
          title="Failed to load course"
        />
      </main>
    );
  }

  const course = detailedCourseQuery.data.data;

  return (
    <main className="mt-40 flex flex-col gap-6">
      <Header title={course.title} />
      <div className="flex justify-between items-start">
        <section className="w-225.75">
          <CourseDetails data={course} />
        </section>
        <div className="flex w-132.5 flex-col gap-3">
          {course.enrollment ? (
            <>
              <section>
                <EnroledUserCard enrollment={course.enrollment} />
              </section>
            </>
          ) : (
            <>
              <section>
                <EnrolmentCard data={course} />
              </section>
              <EnrollmentAccessNotice />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
