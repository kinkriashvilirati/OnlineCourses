import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModal } from "../../context/AuthModalContext";
import {
  isUpdateProfileValidationError,
  useUpdateProfileMutation,
} from "../../hooks/useUpdateProfileMutation";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";
import { AuthModalShell } from "../auth/auth-modal/AuthModalShell";
import { ProfileModalFields } from "./profile-modal/ProfileModalFields";
import { ProfileModalHeader } from "./profile-modal/ProfileModalHeader";
import { mapProfileValidationErrors } from "./profile-modal/profileModal.serverErrors";
import type {
  ProfileBlurredFields,
  ProfileEditableField,
  ProfileErrors,
  ProfileFormValues,
} from "./profile-modal/profileModal.types";
import {
  getInitialProfileFormValues,
  validateProfileField,
  validateProfileAvatar,
  validateProfileForm,
} from "./profile-modal/profileModal.validation";

type ProfileModalContentProps = {
  onClose: () => void;
  profileComplete: boolean;
  user: ReturnType<typeof useAuth>["user"];
};

function ProfileModalContent({
  onClose,
  profileComplete,
  user,
}: ProfileModalContentProps) {
  const { updateUser } = useAuth();
  const initialValues = getInitialProfileFormValues(user);
  const updateProfileMutation = useUpdateProfileMutation();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [blurredFields, setBlurredFields] = useState<ProfileBlurredFields>({});

  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

  useAuthModalLifecycle(true, handleClose);

  useEffect(() => {
    return () => {
      if (avatarPreviewUrl) {
        URL.revokeObjectURL(avatarPreviewUrl);
      }
    };
  }, [avatarPreviewUrl]);

  const handleAvatarChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextAvatarFile = event.target.files?.[0] ?? null;

    setAvatarFile(nextAvatarFile);
    setAvatarPreviewUrl(
      nextAvatarFile ? URL.createObjectURL(nextAvatarFile) : null,
    );

    setErrors((currentErrors) => ({
      ...currentErrors,
      avatar: undefined,
    }));
  };

  const handleFieldChange = (
    field: ProfileEditableField,
    value: ProfileFormValues[ProfileEditableField],
  ) => {
    if ((field === "mobileNumber" || field === "age") && isNaN(Number(value)))
      return;
    if (field === "age" && value.length > 3) return;
    if (field === "mobileNumber" && value.length > 9) return;

    setValues((currentValues) => ({
      ...currentValues,
      [field]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: undefined,
    }));

    setBlurredFields((currentFields) => ({
      ...currentFields,
      [field]: false,
    }));
  };

  const handleFieldBlur = (field: ProfileEditableField) => {
    const nextError = validateProfileField(values, field);

    setErrors((currentErrors) => ({
      ...currentErrors,
      [field]: nextError,
    }));

    setBlurredFields((currentFields) => ({
      ...currentFields,
      [field]: true,
    }));
  };

  const isSaveDisabled = Object.keys(validateProfileForm(values)).length > 0;

  const handleSaveProfile = async () => {
    const nextErrors = validateProfileForm(values);
    const avatarError = validateProfileAvatar(avatarFile);

    if (avatarError) {
      nextErrors.avatar = avatarError;
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const response = await updateProfileMutation.mutateAsync({
        age: Number(values.age),
        avatar: avatarFile,
        fullName: values.fullName.trim(),
        mobileNumber: values.mobileNumber.replace(/\s+/g, ""),
      });

      updateUser(response.data);
      console.log("Profile updated successfully");
      console.log(response.data);
      onClose();
    } catch (error) {
      if (isUpdateProfileValidationError(error)) {
        const validationErrors = error.response?.data?.errors;

        if (validationErrors) {
          setErrors(mapProfileValidationErrors(validationErrors));
        }
        return;
      }

      console.error(error);
    }
  };

  return (
    <AuthModalShell
      closeAriaLabel="Close profile modal"
      isOpen
      onClose={handleClose}
      panelClassName="max-w-115 p-12.25"
      title="Profile"
    >
      <div className="mt-6 space-y-6">
        <ProfileModalHeader isProfileComplete={profileComplete} user={user} />

        <ProfileModalFields
          avatarFileName={avatarFile?.name}
          avatarPreviewUrl={avatarPreviewUrl}
          avatarSize={avatarFile?.size ?? null}
          blurredFields={blurredFields}
          errors={errors}
          isSaving={updateProfileMutation.isPending}
          isSaveDisabled={isSaveDisabled}
          onAvatarChange={handleAvatarChange}
          onFieldBlur={handleFieldBlur}
          onFieldChange={handleFieldChange}
          onSave={handleSaveProfile}
          user={user}
          values={values}
        />
      </div>
    </AuthModalShell>
  );
}

export function ProfileModal() {
  const { profileComplete, user } = useAuth();
  const { closeProfileModal, isProfileModalOpen } = useAuthModal();

  if (!isProfileModalOpen) {
    return null;
  }

  return (
    <ProfileModalContent
      onClose={closeProfileModal}
      profileComplete={profileComplete}
      user={user}
    />
  );
}
