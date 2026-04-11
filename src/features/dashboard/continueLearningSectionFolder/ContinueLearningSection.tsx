import { Link } from "react-router";
import { LoadingDots } from "../../../components/loading/Loading";
import ContinueLearningLockedModal from "./ContinueLearningLockedModal";
import { notAuthCourses } from "./fakeData";
import FeaturedLearningCourse from "./FeaturedLearningCourse";
import { useAuth } from "../../../context/AuthContext";
import { useCoursesInProgressQuery } from "../../../hooks/query-hooks/useCoursesInProgressQuery";
import BrowseCourses from "../../../components/shared/BrowsCourses";
import { ErrorComponent } from "../../../components/error/Error";

export default function ContinueLearningSection() {
  const { isAuthenticated } = useAuth();
  const coursesInProgressQuery = useCoursesInProgressQuery(isAuthenticated);
  const coursesInProgress = coursesInProgressQuery.data?.data ?? [];
  const shouldShowSeeAll = isAuthenticated && coursesInProgress.length >= 4;
  if (coursesInProgressQuery.isSuccess) {
    console.log(coursesInProgressQuery.data);
  }
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <div className="flex justify-between ">
          <p className="text-body-s text-grayscale-700">
            Pick up where you left
          </p>
          {shouldShowSeeAll ? (
            <Link
              to="/courses"
              className="text-underline-m text-purple-500 max-h-7"
            >
              See All
            </Link>
          ) : null}
        </div>
      </header>
      <div>
        <div className="relative ">
          {!isAuthenticated ? (
            <>
              <div className="flex gap-3 transition relative pointer-events-none blur-sm opacity-60">
                {notAuthCourses.map((card) => (
                  <FeaturedLearningCourse enrollment={card} key={card.id} />
                ))}
              </div>
              <ContinueLearningLockedModal />
            </>
          ) : null}

          {isAuthenticated && coursesInProgressQuery.isPending ? (
            <LoadingDots />
          ) : null}

          {isAuthenticated && coursesInProgressQuery.isError ? (
            <ErrorComponent />
          ) : null}

          {isAuthenticated &&
          coursesInProgressQuery.data &&
          coursesInProgress.length > 0 ? (
            <div className="flex gap-3 transition relative">
              {coursesInProgress.map((card) => (
                <FeaturedLearningCourse enrollment={card} key={card.id} />
              ))}
            </div>
          ) : null}

          {isAuthenticated &&
          coursesInProgressQuery.data &&
          coursesInProgress.length === 0 ? (
            <div className="flex py-20 flex-col items-center justify-center rounded-xl border border-grayscale-100 bg-grayscale-50 px-8 text-center">
              <h4 className="max-w-120 text-h4 text-purple-900 mb-3">
                You haven&apos;t enrolled in any courses yet. Start your
                learning journey today!
              </h4>

              <BrowseCourses />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
