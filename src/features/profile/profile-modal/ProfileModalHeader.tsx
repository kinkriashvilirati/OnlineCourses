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
    <div className="flex items-center gap-6">
      <div className="relative">
        <div className="flex h-31 w-31 items-center justify-center rounded-full bg-purple-50">
          {user?.avatar ? (
            <img
              alt={`${getDisplayName(user)} avatar`}
              className="h-full w-full rounded-full object-cover"
              src={user.avatar}
            />
          ) : (
            <ProfileIconSvg size={20} />
          )}
        </div>

        <ProfileStatusIndicator
          className="right-1 bottom-1 border-[3px] w-6 h-6"
          isProfileComplete={isProfileComplete}
        />
      </div>

      <div className="space-y-1">
        <p className="text-h1">{getDisplayName(user)}</p>
        <p
          className={[
            "text-body-l",
            isProfileComplete ? "text-helper-success" : "text-helper-warning",
          ].join(" ")}
        >
          {getProfileStatusLabel(isProfileComplete)}
        </p>
        <button
          className="text-helper-regular text-grayscale-400 underline decoration-grayscale-300 underline-offset-3"
          type="button"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
