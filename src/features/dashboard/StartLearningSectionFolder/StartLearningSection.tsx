export default function StartLearningSection() {
  return (
    <>
      <section className="flex flex-col gap-9">
        <header>
          <h1 className="text-h1 text-grayscale-950">Start Learning Today</h1>
          <p className="text-body-s  text-grayscale-700">
            Choose from our most popular courses and begin your journey
          </p>
        </header>
        <div className="flex gap-6">
          <article className="bg-grayscale-50 border border-grayscale-100 rounded-xl gap-6 p-5 w-full"></article>
          <article className="bg-grayscale-50 border w-full"></article>
          <article className="bg-grayscale-50 border w-full"></article>
        </div>
      </section>
    </>
  );
}
