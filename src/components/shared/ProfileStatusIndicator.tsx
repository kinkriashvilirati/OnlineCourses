type ProfileStatusIndicatorProps = {
  className?: string;
  isProfileComplete: boolean;
};

export default function ProfileStatusIndicator({
  className,
  isProfileComplete,
}: ProfileStatusIndicatorProps) {
  return (
    <span
      className={[
        "absolute right-0 bottom-0 h-3.75 w-3.75 rounded-full border-2 border-grayscale-50",
        isProfileComplete ? "bg-helper-success" : "bg-helper-warning",
        className ?? "",
      ].join(" ")}
    />
  );
}
