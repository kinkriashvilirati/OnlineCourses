import { Link } from "react-router";

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
  description = "The page you are looking for does not exist, was moved, or the link is incorrect.",
  title = "Page not found",
}: ErrorProps) {
  return (
    <div className="flex min-h-[65vh] items-center justify-center px-6 py-16">
      <div className="relative w-full max-w-180 overflow-hidden rounded-4xl border border-grayscale-200 bg-grayscale-50 px-10 py-14 shadow-[0_24px_60px_rgba(20,20,20,0.08)]">
        <div className="absolute right-10 top-8 h-36 w-36 rounded-full bg-purple-500/10 blur-3xl" />
        <div className="absolute bottom-6 left-12 h-24 w-24 rounded-full bg-helper-warning/10 blur-2xl" />

        <div className="relative flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-helper-error/8">
            <ErrorIcon />
          </div>

          <p className="mt-6 text-helper-medium uppercase tracking-[0.28em] text-purple-500">
            404 Error
          </p>
          <p className="mt-4 text-[96px] font-bold leading-none text-purple-500">
            404
          </p>
          <h1 className="mt-4 text-h1 text-grayscale-950">{title}</h1>
          <p className="mt-4 max-w-110 text-body-s leading-normal text-grayscale-600">
            {description}
          </p>

          <div className="mt-8 flex items-center gap-4">
            <Link className="button-primary px-6 py-3.5 text-button-m" to="/">
              Go Home
            </Link>
            <Link
              className="button-outline px-6 py-3.5 text-button-m"
              to="/courses"
            >
              Browse Courses
            </Link>
          </div>
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
