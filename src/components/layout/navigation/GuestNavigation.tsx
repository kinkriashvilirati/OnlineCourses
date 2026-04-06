import { useAuthModal } from "../../../context/AuthModalContext";
import BrowseCourses from "./BrowsCourses";

export default function GuestNavigation() {
  const { openLoginModal, openRegisterModal } = useAuthModal();

  return (
    <>
      <div className="flex items-center gap-10 ">
        <BrowseCourses />
        <div className="flex  items-center gap-3">
          <button
            className="button-outline h-15 px-4 text-button-m"
            onClick={openLoginModal}
            type="button"
          >
            Log In
          </button>
          <button
            className="button-primary text-button-m  py-3 px-4 "
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
