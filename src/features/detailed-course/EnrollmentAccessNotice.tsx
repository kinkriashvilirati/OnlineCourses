import { useState } from "react";
import GetModdelacons from "../../assets/icons/modalIcons/GetModellacons";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import CourseTakeModal from "./CourseTakeModal";

export default function EnrollmentAccessNotice() {
  const { isAuthenticated, isAuthRestoring, profileComplete } = useAuth();
  const { openLoginModal, openProfileModal } = useAuthModal();
  const [isCompleteProfileModalOpen, setIsCompleteProfileModalOpen] =
    useState(false);

  if (isAuthRestoring || (isAuthenticated && profileComplete)) {
    return null;
  }

  const isGuestUser = !isAuthenticated;
  const title = isGuestUser
    ? "Authentication Required"
    : "Complete Your Profile";
  const description = isGuestUser
    ? "You need sign in to your profile before enrolling in this course."
    : "You need to fill in your profile details before enrolling in this course.";
  const buttonLabel = isGuestUser ? "Sign In" : "Complete";
  const handleClick = isGuestUser
    ? openLoginModal
    : () => setIsCompleteProfileModalOpen(true);

  return (
    <>
      <aside className="flex items-center justify-between border border-grayscale-100 bg-grayscale-50 p-5 rounded-xl">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-3">
            <img
              alt=""
              className="h-5.5 w-5.5 shrink-0"
              src={GetModdelacons.warning}
            />
            <p className="text-body-s text-grayscale-800">{title}</p>
          </div>

          <p className="text-helper-regular text-grayscale-400">{description}</p>
        </div>

        <button
          className="button-outline shrink-0 px-3 py-2.5 text-helper-medium"
          onClick={handleClick}
          type="button"
        >
          {buttonLabel} →
        </button>
      </aside>

      {!isGuestUser ? (
        <CourseTakeModal
          actions={
            <>
              <button
                className="w-full cursor-pointer rounded-xl border-2 border-purple-300 bg-grayscale-50 px-5 py-4 text-button-l text-purple-600 transition-all duration-300 hover:bg-purple-50"
                onClick={() => {
                  setIsCompleteProfileModalOpen(false);
                  openProfileModal();
                }}
                type="button"
              >
                Complete Profile
              </button>
              <button
                className="w-full cursor-pointer rounded-xl border-2 border-purple-500 bg-purple-500 px-5 py-4 text-button-l text-grayscale-50 transition-all duration-300 hover:bg-purple-600"
                onClick={() => setIsCompleteProfileModalOpen(false)}
                type="button"
              >
                Cancel
              </button>
            </>
          }
          description="You need to complete your profile before enrolling in this course."
          icon="user"
          isOpen={isCompleteProfileModalOpen}
          onClose={() => setIsCompleteProfileModalOpen(false)}
          title="Complete your profile to continue"
        />
      ) : null}
    </>
  );
}
