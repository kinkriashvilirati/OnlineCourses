import { useState } from "react";
import { ProfileModal } from "../../../features/profile/ProfileModal";
import ProfileIconSvg from "../../shared/ProfileIconSvg";
import ProfileStatusIndicator from "../../shared/ProfileStatusIndicator";

type ProfileStatusButtonProps = {
  isProfileComplete: boolean;
};

export default function ProfileStatusButton({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  return (
    <>
      <button
        aria-label="Open profile"
        className="relative flex h-15 w-15 items-center justify-center rounded-full border border-purple-50 bg-purple-50 text-purple-400 transition-colors duration-200 hover:border-purple-200 cursor-pointer"
        onClick={() => setIsProfileModalOpen(true)}
        type="button"
      >
        <ProfileIconSvg />
        <ProfileStatusIndicator isProfileComplete={isProfileComplete} />
      </button>

      <ProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
      />
    </>
  );
}
