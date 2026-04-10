import continueLearningBase from "../../../assets/images/continue_learning_base.png";
import fullStarIcon from "../../../assets/icons/icon-set/full_star.svg";

export default function ContinueLearningSection() {
  const progressPercentage = 65;
  const clampedProgressPercentage = Math.min(
    Math.max(progressPercentage, 0),
    100,
  );

  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <p className="text-body-s text-grayscale-700">Pick up where you left</p>
      </header>
      <div className="flex gap-3">
        <article className="bg-grayscale-50 min-h-5 flex w-full flex-col rounded-xl border border-grayscale-100 p-5 gap-2 justify-between">
          <div className="flex">
            <img
              alt="Advanced React and TypeScript course preview"
              className="h-W30.75 max-w-35 shrink-0 rounded-2xl object-cover"
              src={continueLearningBase}
            />

            <div className="flex  flex-1 flex-col gap-2.25 pl-4 pr-1">
              <div className="flex items-start justify-between ">
                <p className="text-body-xs text-grayscale-400">
                  Lecturer Marilyn Mango
                </p>

                <div className="flex items-center gap-1.5 text-body-s text-grayscale-600">
                  <img alt="" className="h-5 w-5" src={fullStarIcon} />
                  <span>4.9</span>
                </div>
              </div>

              <h3 className=" text-h4  text-grayscale-900">
                Advanced React &amp; TypeScript Development
              </h3>
            </div>
          </div>

          <div className="flex items-end justify-between gap-10">
            <div className="flex flex-1 flex-col gap-3">
              <p className="text-body-m text-grayscale-900">
                {clampedProgressPercentage}% Complete
              </p>

              <div className="h-4 w-full overflow-hidden rounded-full bg-purple-100">
                <div
                  className="h-full rounded-full bg-purple-500 transition-all duration-500"
                  style={{ width: `${clampedProgressPercentage}%` }}
                />
              </div>
            </div>

            <button
              className="button-outline min-w-33 rounded-2xl px-8 py-4 text-button-m"
              type="button"
            >
              View
            </button>
          </div>
        </article>
        <article className="bg-grayscale-50 min-h-5  flex w-full flex-col rounded-xl border border-grayscale-100  p-5 gap-6  justify-between"></article>
        <article className="bg-grayscale-50 min-h-5  flex w-full flex-col rounded-xl border border-grayscale-100  p-5 gap-6  justify-between"></article>
      </div>
    </section>
  );
}
