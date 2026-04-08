import type { ChangeEvent } from "react";
import arrowIcon from "../../../assets/icons/icon-set/Arrow.svg";
import checkIcon from "../../../assets/icons/icon-set/Check.svg";
import pencilIcon from "../../../assets/icons/icon-set/PencilSimple.svg";
import type { RegisterApiUser } from "../../../api/auth/register";
import AvatarInput from "../../../components/shared/AvatarInput";
import { ProfileInputField } from "./ProfileInputField";

type ProfileModalFieldsProps = {
  avatarFileName?: string;
  avatarPreviewUrl: string | null;
  avatarSize: number | null;
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  user: RegisterApiUser | null;
};

function getMobilePlaceholder(mobileNumber: string | null) {
  if (!mobileNumber) {
    return "";
  }

  return mobileNumber.replace(/^\+?995\s?/, "");
}

export function ProfileModalFields({
  avatarFileName,
  avatarPreviewUrl,
  avatarSize,
  onAvatarChange,
  user,
}: ProfileModalFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <ProfileInputField
          defaultValue={user?.fullName ?? user?.username ?? ""}
          label="Full Name"
          rightAdornment={
            <img alt="" className="h-5 w-5 opacity-45" src={pencilIcon} />
          }
        />

        <ProfileInputField
          defaultValue={user?.email ?? ""}
          disabled
          label="Email"
          readOnly
          rightAdornment={
            <img alt="" className="h-5 w-5 opacity-40" src={checkIcon} />
          }
          type="email"
        />

        <div className="flex items-end gap-2">
          <div className="w-[267px]">
            <ProfileInputField
              inputMode="numeric"
              label="Mobile Number"
              placeholder={getMobilePlaceholder(user?.mobileNumber ?? null)}
              prefix="+995"
              rightAdornment={
                <img alt="" className="h-4 w-4 opacity-40" src={checkIcon} />
              }
            />
          </div>

          <div className="flex-1">
            <ProfileInputField
              inputMode="numeric"
              label="Age"
              placeholder={user?.age ? String(user.age) : ""}
              rightAdornment={
                <img alt="" className="h-4 w-4 opacity-40" src={arrowIcon} />
              }
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-2 text-body-m text-grayscale-700">Upload Avatar</p>

        <AvatarInput
          avatarError={undefined}
          avatarFileName={avatarFileName}
          avatarPreviewUrl={avatarPreviewUrl}
          avatarSize={avatarSize}
          inputId="profile-avatar"
        />

        <input
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          id="profile-avatar"
          onChange={onAvatarChange}
          type="file"
        />
      </div>

      <div className="pt-1">
        <button className="button-primary h-12 w-full text-button-s" type="button">
          Save Profile
        </button>
      </div>
    </div>
  );
}
