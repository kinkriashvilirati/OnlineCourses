import courseBaseImage from "../../../assets/images/course_base_img.jpg";
import fullStarIcon from "../../../assets/icons/icon-set/full_star.svg";

export default function StartLearningSection() {
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Start Learning Today</h1>
        <p className="text-body-s text-grayscale-700">
          Choose from our most popular courses and begin your journey
        </p>
      </header>

      <div className="flex gap-6">
        <article className="flex w-full flex-col rounded-xl border border-grayscale-100 bg-grayscale-50 p-5 gap-6">
          <div className="flex flex-col gap-4">
            <img
              alt="Advanced React and TypeScript course preview"
              className="h-65.5 w-full rounded-2xl object-cover"
              src={courseBaseImage}
            />

            <div className=" flex items-center justify-between gap-4">
              <p className="text-body-xs text-grayscale-500">
                Lecturer Marilyn Mango
              </p>

              <div className="flex items-center gap-1.5 text-body-s text-grayscale-600">
                <img alt="" className="h-5 w-5" src={fullStarIcon} />
                <span>4.9</span>
              </div>
            </div>

            <h3 className="text-h3 text-grayscale-950">
              Advanced React &amp; TypeScript Development
            </h3>

            <p className="text-body-s text-grayscale-500">
              Master modern React patterns, hooks, and TypeScript integration
              for building scalable web applications.
            </p>
          </div>

          <div className=" flex items-end justify-between gap-6">
            <div className="flex gap-2 items-center">
              <span className="text-helper-medium text-grayscale-400">
                Starting from
              </span>
              <h2 className="text-h2 text-grayscale-900">$299</h2>
            </div>

            <button
              className="button-primary px-6.25 py-4.25 text-button-m"
              type="button"
            >
              Details
            </button>
          </div>
        </article>

        <article className="w-full rounded-[20px] border border-grayscale-100 bg-grayscale-50 " />
        <article className="w-full rounded-[20px] border border-grayscale-100 bg-grayscale-50 " />
      </div>
    </section>
  );
}
