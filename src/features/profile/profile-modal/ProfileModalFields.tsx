import type { ChangeEvent } from "react";
import arrowIcon from "../../../assets/icons/icon-set/Arrow.svg";
import checkIcon from "../../../assets/icons/icon-set/Check.svg";
import pencilIcon from "../../../assets/icons/icon-set/PencilSimple.svg";
import type { RegisterApiUser } from "../../../api/auth/register";
import AvatarInput from "../../../components/shared/AvatarInput";
import type {
  ProfileBlurredFields,
  ProfileEditableField,
  ProfileErrors,
  ProfileFormValues,
} from "./profileModal.types";
import { ProfileInputField } from "./ProfileInputField";

type ProfileModalFieldsProps = {
  avatarFileName?: string;
  avatarPreviewUrl: string | null;
  avatarSize: number | null;
  blurredFields: ProfileBlurredFields;
  errors: ProfileErrors;
  isSaving: boolean;
  isSaveDisabled: boolean;
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onFieldBlur: (field: ProfileEditableField) => void;
  onFieldChange: (field: ProfileEditableField, value: string) => void;
  onSave: () => void;
  user: RegisterApiUser | null;
  values: ProfileFormValues;
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
  blurredFields,
  errors,
  isSaving,
  isSaveDisabled,
  onAvatarChange,
  onFieldBlur,
  onFieldChange,
  onSave,
  user,
  values,
}: ProfileModalFieldsProps) {
  return (
    <div className="space-y-6">
      <div className="space-y-5">
        <ProfileInputField
          error={errors.fullName}
          isValid={Boolean(blurredFields.fullName && !errors.fullName)}
          label="Full Name"
          onBlur={() => onFieldBlur("fullName")}
          onChange={(value) => onFieldChange("fullName", value)}
          rightAdornment={
            <img alt="" className="h-5 w-5 opacity-45" src={pencilIcon} />
          }
          value={values.fullName}
        />

        <ProfileInputField
          disabled
          label="Email"
          readOnly
          rightAdornment={
            <img alt="" className="h-5 w-5 opacity-40" src={checkIcon} />
          }
          type="email"
          value={values.email}
        />

        <div className="flex items-end gap-2">
          <div className="w-66.75">
            <ProfileInputField
              error={errors.mobileNumber}
              inputMode="numeric"
              isValid={Boolean(
                blurredFields.mobileNumber && !errors.mobileNumber,
              )}
              label="Mobile Number"
              onBlur={() => onFieldBlur("mobileNumber")}
              onChange={(value) => onFieldChange("mobileNumber", value)}
              placeholder={
                values.mobileNumber
                  ? undefined
                  : getMobilePlaceholder(user?.mobileNumber ?? null)
              }
              prefix="+995"
              rightAdornment={
                <img alt="" className="h-4 w-4 opacity-40" src={checkIcon} />
              }
              value={values.mobileNumber}
            />
          </div>

          <div className="flex-1">
            <ProfileInputField
              error={errors.age}
              inputMode="numeric"
              isValid={Boolean(blurredFields.age && !errors.age)}
              label="Age"
              onBlur={() => onFieldBlur("age")}
              onChange={(value) => onFieldChange("age", value)}
              placeholder={
                values.age ? undefined : user?.age ? String(user.age) : ""
              }
              rightAdornment={
                <img alt="" className="h-4 w-4 opacity-40" src={arrowIcon} />
              }
              value={values.age}
            />
          </div>
        </div>
      </div>

      <div className="mt-10">
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
        <button
          className="button-primary h-12 w-full text-button-s"
          disabled={isSaveDisabled || isSaving}
          onClick={onSave}
          type="button"
        >
          {isSaving ? "Saving Profile..." : "Save Profile"}
        </button>
      </div>
    </div>
  );
}
