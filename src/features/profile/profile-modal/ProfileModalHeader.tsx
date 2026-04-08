import type { RegisterApiUser } from "../../../api/auth/register";
import ProfileIconSvg from "../../../components/shared/ProfileIconSvg";
import ProfileStatusIndicator from "../../../components/shared/ProfileStatusIndicator";

type ProfileModalHeaderProps = {
  isProfileComplete: boolean;
  user: RegisterApiUser | null;
};

function getDisplayName(user: RegisterApiUser | null) {
  return user?.fullName?.trim() || user?.username || "User";
}

function getProfileStatusLabel(isProfileComplete: boolean) {
  return isProfileComplete ? "Profile Completed" : "Incomplete Profile";
}

export function ProfileModalHeader({
  isProfileComplete,
  user,
}: ProfileModalHeaderProps) {
  return (
    <div className="flex items-start justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="relative">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-purple-50">
            {user?.avatar ? (
              <img
                alt={`${getDisplayName(user)} avatar`}
                className="h-full w-full rounded-full object-cover"
                src={user.avatar}
              />
            ) : (
              <ProfileIconSvg size={32} />
            )}
          </div>

          <ProfileStatusIndicator
            className="right-0 bottom-0 h-3.75 w-3.75"
            isProfileComplete={isProfileComplete}
          />
        </div>

        <div className="space-y-0.5">
          <p className="text-h4">{getDisplayName(user)}</p>
          <p
            className={[
              "text-helper-regular",
              isProfileComplete ? "text-helper-success" : "text-helper-warning",
            ].join(" ")}
          >
            {getProfileStatusLabel(isProfileComplete)}
          </p>
        </div>
      </div>

      <button
        className="text-helper-regular text-grayscale-400 underline decoration-grayscale-300 underline-offset-3"
        type="button"
      >
        Log Out
      </button>
    </div>
  );
}
