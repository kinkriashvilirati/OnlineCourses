import { notAuthCards } from "./fakeData";
import FeaturedLearningCourse from "./FeaturedLearningCourse";

export default function ContinueLearningSection() {
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <p className="text-body-s text-grayscale-700">Pick up where you left</p>
      </header>
      <div className="flex gap-3">
        {notAuthCards.map((card) => (
          <FeaturedLearningCourse enrollment={card} key={card.id} />
        ))}
      </div>
    </section>
  );
}
