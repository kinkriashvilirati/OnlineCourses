import { continue_learning_base } from "../../../assets/images/continue_learning_base.png";
export default function ContinueLearningSection() {
  return (
    <section className="flex flex-col gap-9">
      <header>
        <h1 className="text-h1 text-grayscale-950">Continue Learning</h1>
        <p className="text-body-s text-grayscale-700">Pick up where you left</p>
      </header>
      <div className="flex gap-3">
        <article className="bg-grayscale-50 min-h-5  flex w-full flex-col rounded-xl border border-grayscale-100  p-5 gap-6  justify-between"></article>
        <article className="bg-grayscale-50 min-h-5  flex w-full flex-col rounded-xl border border-grayscale-100  p-5 gap-6  justify-between"></article>
        <article className="bg-grayscale-50 min-h-5  flex w-full flex-col rounded-xl border border-grayscale-100  p-5 gap-6  justify-between"></article>
      </div>
    </section>
  );
}
