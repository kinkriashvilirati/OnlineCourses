import { LoadingDots } from "../../../components/loading/Loading";
import { useFeaturedCoursesQuery } from "../../../hooks/useFeaturedCoursesQuery";
import FeaturedCourseCard from "./FeaturedCourseCard";

export default function StartLearningSection() {
  const featuredCoursesQuery = useFeaturedCoursesQuery();

  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Start Learning Today</h1>
        <p className="text-body-s text-grayscale-700">
          Choose from our most popular courses and begin your journey
        </p>
      </header>

      {featuredCoursesQuery.isPending ? <LoadingDots /> : null}

      {featuredCoursesQuery.isError ? <p>Failed to load courses</p> : null}

      {featuredCoursesQuery.data ? (
        <div className="flex gap-6">
          {featuredCoursesQuery.data.data.map((course) => (
            <FeaturedCourseCard course={course} key={course.id} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
