import { Link } from "react-router";
import ContinueLearningLockedModal from "./ContinueLearningLockedModal";
import { notAuthCourses } from "./fakeData";
import FeaturedLearningCourse from "./FeaturedLearningCourse";
import { useAuth } from "../../../context/AuthContext";

export default function ContinueLearningSection() {
  const { isAuthenticated } = useAuth();
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <div className="flex justify-between ">
          <p className="text-body-s text-grayscale-700">
            Pick up where you left
          </p>
          <Link
            to={isAuthenticated ? "/courses" : "/"}
            className="text-underline-m text-purple-500 max-h-7"
          >
            See All
          </Link>
        </div>
      </header>
      <div>
        <div className="relative ">
          <div
            className={`flex gap-3 transition relative ${
              !isAuthenticated ? "pointer-events-none blur-sm opacity-60" : ""
            }`}
          >
            {notAuthCourses.map((card) => (
              <FeaturedLearningCourse enrollment={card} key={card.id} />
            ))}
          </div>
          {!isAuthenticated ? <ContinueLearningLockedModal /> : null}
        </div>
      </div>
    </section>
  );
}
