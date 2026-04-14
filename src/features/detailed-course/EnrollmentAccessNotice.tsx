import GetModdelacons from "../../assets/icons/modalIcons/GetModellacons";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";

export default function EnrollmentAccessNotice() {
  const { isAuthenticated, isAuthRestoring, profileComplete } = useAuth();
  const { openLoginModal, openProfileModal } = useAuthModal();

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
  const handleClick = isGuestUser ? openLoginModal : openProfileModal;

  return (
    <aside className="flex items-center justify-between   border border-grayscale-100 bg-grayscale-50 p-5 rounded-xl">
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
  );
}
