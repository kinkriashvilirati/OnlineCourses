export default function ProgressBar({
  clampedProgressPercentage,
}: {
  clampedProgressPercentage: number;
}) {
  return (
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
  );
}
