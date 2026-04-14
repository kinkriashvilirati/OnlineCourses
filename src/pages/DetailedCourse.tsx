// import { useParams } from "react-router";
import CourseDetails from "../features/detailed-course/CourseDetails";
import EnrolmentCard from "../features/detailed-course/EnrolmentCard";
import EnrollmentAccessNotice from "../features/detailed-course/EnrollmentAccessNotice";

import { DETAILED_DATA_MOCK } from "../features/detailed-course/mockData";
import Header from "../features/detailed-course/Navigation";
export default function DetailedCourse() {
  // const { courseId } = useParams();
  const { data_mock } = DETAILED_DATA_MOCK;
  return (
    <main className="mt-40 flex flex-col gap-6">
      <Header title={data_mock.title} />
      <div className="flex justify-between items-start">
        <section className="w-225.75">
          <CourseDetails data={data_mock} />
        </section>
        <div className="flex w-132.5 flex-col gap-3">
          <section>
            <EnrolmentCard data={data_mock} />
          </section>
          <EnrollmentAccessNotice />
        </div>
      </div>
    </main>
  );
}
