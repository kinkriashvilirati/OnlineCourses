import lockIcon from "../../../assets/icons/icon-set/lock.svg";
import { useAuthModal } from "../../../context/AuthModalContext";

export default function ContinueLearningLockedModal() {
  const { openLoginModal } = useAuthModal();

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center px-6">
      <div className="box-border flex h-full w-104.5 max-w-full flex-col items-center max-mobile:justify-center max-mobile:gap-2 justify-between rounded-xl border border-grayscale-200 bg-grayscale-50 px-14 py-8 text-center">
        <div className="flex flex-col items-center gap-3">
          <div className="flex h-21 w-21 items-center justify-center rounded-full bg-purple-50">
            <img alt="" className="h-8 w-8" src={lockIcon} />
          </div>

          <p className="text-body-s text-purple-900">
            Sign in to track your learning progress
          </p>
        </div>

        <button
          className="button-primary w-20.75 h-10.5 rounded-lg text-button-s p-0"
          onClick={openLoginModal}
          type="button"
        >
          Log In
        </button>
      </div>
    </div>
  );
}
