import { Link } from "react-router";
import ContinueLearningLockedModal from "./ContinueLearningLockedModal";
import { notAuthCards } from "./fakeData";
import FeaturedLearningCourse from "./FeaturedLearningCourse";

export default function ContinueLearningSection() {
  const isDisabled = true;
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <div className="flex justify-between ">
          <p className="text-body-s text-grayscale-700">
            Pick up where you left
          </p>
          <Link
            to={!isDisabled ? "/courses" : "/"}
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
              isDisabled ? "pointer-events-none blur-sm opacity-60" : ""
            }`}
          >
            {notAuthCards.map((card) => (
              <FeaturedLearningCourse enrollment={card} key={card.id} />
            ))}
          </div>
          {isDisabled ? <ContinueLearningLockedModal /> : null}
        </div>
      </div>
    </section>
  );
}
