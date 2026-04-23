import { LoadingDots } from "../../../components/loading/Loading";
import ContinueLearningLockedModal from "./ContinueLearningLockedModal";
import { notAuthCourses } from "./fakeData";
import FeaturedLearningCourse from "./FeaturedLearningCourse";
import { useAuth } from "../../../context/AuthContext";
import { useCoursesInProgressQuery } from "../../../hooks/query-hooks/useCoursesInProgressQuery";
import BrowseCourses from "../../../components/shared/BrowsCourses";
import { ErrorComponent } from "../../../components/error/Error";
import { useAuthModal } from "../../../context/AuthModalContext";

export default function ContinueLearningSection() {
  const { isAuthenticated } = useAuth();
  const coursesInProgressQuery = useCoursesInProgressQuery(isAuthenticated);
  const coursesInProgress = coursesInProgressQuery.data?.data ?? [];
  const shouldShowSeeAll = isAuthenticated && coursesInProgress.length >= 4;
  const { setIsPanelOpen } = useAuthModal();

  if (coursesInProgressQuery.isSuccess) {
    console.log(coursesInProgressQuery.data);
  }
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <div className="flex justify-between">
          <p className="text-body-s text-grayscale-700">
            Pick up where you left
          </p>
          {shouldShowSeeAll ? (
            <button
              onClick={() => {
                setIsPanelOpen((prev) => !prev);
              }}
              className="text-underline-m text-purple-500 max-h-7 cursor-pointer hover:text-purple-500 transition-all duration-300"
            >
              See All
            </button>
          ) : null}
        </div>
      </header>
      <div>
        <div className="relative">
          {!isAuthenticated ? (
            <>
              <div className="grid grid-cols-3 gap-3 transition relative pointer-events-none blur-sm opacity-60 max-laptop:grid-cols-2 max-tablet:grid-cols-1">
                {notAuthCourses.map((card, index) => (
                  <div
                    key={card.id}
                    className={index > 0 ? "max-tablet:hidden" : ""}
                  >
                    <FeaturedLearningCourse enrollment={card} />
                  </div>
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
            <div className="grid grid-cols-3 gap-3 transition relative max-laptop:grid-cols-2 max-tablet:grid-cols-1">
              {coursesInProgress.map((card, i) => (
                <>
                  {i != 3 && (
                    <FeaturedLearningCourse enrollment={card} key={card.id} />
                  )}
                </>
              ))}
            </div>
          ) : null}

          {isAuthenticated &&
          coursesInProgressQuery.data &&
          coursesInProgress.length === 0 ? (
            <div className="flex py-20 flex-col items-center justify-center rounded-xl border border-grayscale-100 bg-grayscale-50 px-8 text-center max-tablet:py-12 max-tablet:px-4">
              <h4 className="max-w-120 text-h4 text-purple-900 mb-3 max-tablet:text-h5">
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
