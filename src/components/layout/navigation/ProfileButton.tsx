import ProfileIconSvg from "../../shared/ProfileIconSvg";

type ProfileStatusButtonProps = {
  isProfileComplete: boolean;
};

function ProfileStatusIndicator({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  if (isProfileComplete) {
    return (
      <span className="absolute right-0 bottom-0 h-3.75 w-3.75  flexitems-center justify-center rounded-full border-2 border-grayscale-100 bg-helper-success text-grayscale-50"></span>
    );
  }

  return (
    <span className="absolute right-0 bottom-0  h-3.75 w-3.75 rounded-full border-2 border-grayscale-100 bg-helper-warning" />
  );
}

export default function ProfileStatusButton({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  return (
    <button
      aria-label="Open profile"
      className="relative flex h-15 w-15 items-center justify-center rounded-full bg-purple-50 text-purple-400 transition-colors duration-200 border border-purple-50 hover:border-purple-200 cursor-pointer"
      type="button"
    >
      <ProfileIconSvg />
      <ProfileStatusIndicator isProfileComplete={isProfileComplete} />
    </button>
  );
}
