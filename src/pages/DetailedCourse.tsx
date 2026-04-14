// import { useParams } from "react-router";
import CourseDetails from "../features/detailed-course/CourseDetails";
import EnrolmentCard from "../features/detailed-course/EnrolmentCard";
import { DETAILED_DATA_MOCK } from "../features/detailed-course/mockData";
import Header from "../features/detailed-course/Navigation";
export default function DetailedCourse() {
  // const { courseId } = useParams();
  const { data_mock } = DETAILED_DATA_MOCK;
  return (
    <main className="mt-40 flex flex-col gap-6">
      <Header title={data_mock.title} />
      <div className="flex justify-between items-center">
        <section className="w-225.75">
          <CourseDetails data={data_mock} />
        </section>
        <section className="w-132.5">
          <EnrolmentCard />
        </section>
      </div>
    </main>
  );
}
