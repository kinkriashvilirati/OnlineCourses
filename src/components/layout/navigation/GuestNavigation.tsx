import { useAuthModal } from "../../../context/AuthModalContext";
import BrowseCourses from "../../shared/BrowsCourses";

export default function GuestNavigation() {
  const { openLoginModal, openRegisterModal } = useAuthModal();
  const buttonClass = ` text-button-m h-15 px-4 max-laptop:h-12 max-laptop:px-3 max-laptop:text-button-s max-tablet:h-10 max-tablet:px-2.5  flex justify-center items-center `;
  return (
    <>
      <div className="flex items-center gap-10 ">
        <BrowseCourses />
        <div className="flex  items-center gap-3">
          <button
            className={`${buttonClass} button-outline `}
            onClick={openLoginModal}
            type="button"
          >
            Log In
          </button>
          <button
            className={`${buttonClass} button-primary`}
            onClick={openRegisterModal}
            type="button"
          >
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}
