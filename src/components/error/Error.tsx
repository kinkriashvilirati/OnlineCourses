type ErrorProps = {
  description?: string;
  title?: string;
};

function ErrorIcon() {
  return (
    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-helper-error/12">
      <div className="absolute h-12 w-12 rounded-full border border-helper-error/20" />
      <span className="text-[22px] font-semibold leading-none text-helper-error">
        !
      </span>
    </div>
  );
}

export function ErrorPage({
  description = "We couldn't load this page right now. Please try again in a moment.",
  title = "Something went wrong",
}: ErrorProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-6 py-16">
      <div className="w-full max-w-120 rounded-3xl border border-grayscale-200 bg-grayscale-50 px-10 py-12 shadow-[0_20px_50px_rgba(20,20,20,0.08)]">
        <div className="flex flex-col items-center text-center">
          <ErrorIcon />

          <h1 className="mt-6 text-h2 text-grayscale-950">{title}</h1>
          <p className="mt-4 max-w-88 text-body-s leading-normal text-grayscale-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function ErrorComponent({
  description = "Please try again in a moment.",
  title = "Failed to load content",
}: ErrorProps) {
  return (
    <div className="rounded-[20px] border border-helper-error/20 bg-helper-error/6 px-5 py-4">
      <div className="flex items-start gap-4">
        <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-helper-error/12 text-helper-error">
          !
        </div>

        <div className="min-w-0">
          <p className="text-body-m text-grayscale-900">{title}</p>
          <p className="mt-1 text-body-xs leading-normal text-grayscale-600">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
