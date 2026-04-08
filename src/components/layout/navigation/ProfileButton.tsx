import { useAuthModal } from "../../../context/AuthModalContext";
import ProfileIconSvg from "../../shared/ProfileIconSvg";
import ProfileStatusIndicator from "../../shared/ProfileStatusIndicator";

type ProfileStatusButtonProps = {
  isProfileComplete: boolean;
};

export default function ProfileStatusButton({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  const { openProfileModal } = useAuthModal();

  return (
    <button
      aria-label="Open profile"
      className="relative flex h-15 w-15 items-center justify-center rounded-full border border-purple-50 bg-purple-50 text-purple-400 transition-colors duration-200 hover:border-purple-200 cursor-pointer"
      onClick={openProfileModal}
      type="button"
    >
      <ProfileIconSvg />
      <ProfileStatusIndicator isProfileComplete={isProfileComplete} />
    </button>
  );
}
