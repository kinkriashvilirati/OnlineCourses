import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";
import { AuthModalShell } from "../auth/auth-modal/AuthModalShell";
import { ProfileModalFields } from "./profile-modal/ProfileModalFields";
import { ProfileModalHeader } from "./profile-modal/ProfileModalHeader";
import type {
  ProfileBlurredFields,
  ProfileEditableField,
  ProfileErrors,
  ProfileFormValues,
  ProfileModalProps,
} from "./profile-modal/profileModal.types";
import {
  getInitialProfileFormValues,
  validateProfileField,
  validateProfileForm,
} from "./profile-modal/profileModal.validation";

function resetProfileModalState(
  setAvatarFile: (file: File | null) => void,
  setAvatarPreviewUrl: (url: string | null) => void,
  setValues: (values: ProfileFormValues) => void,
  setErrors: (errors: ProfileErrors) => void,
  setBlurredFields: (fields: ProfileBlurredFields) => void,
  values: ProfileFormValues,
) {
  setAvatarFile(null);
  setAvatarPreviewUrl(null);
  setValues(values);
  setErrors({});
  setBlurredFields({});
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profileComplete, user } = useAuth();
  const initialValues = getInitialProfileFormValues(user);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);
  const [values, setValues] = useState<ProfileFormValues>(initialValues);
  const [errors, setErrors] = useState<ProfileErrors>({});
  const [blurredFields, setBlurredFields] = useState<ProfileBlurredFields>({});

  const handleClose = useCallback(() => {
    resetProfileModalState(
      setAvatarFile,
      setAvatarPreviewUrl,
      setValues,
      setErrors,
      setBlurredFields,
      getInitialProfileFormValues(user),
    );
    onClose();
  }, [onClose, user]);

  useAuthModalLifecycle(isOpen, handleClose);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const nextValues = getInitialProfileFormValues(user);
    setValues(nextValues);
    setErrors({});
    setBlurredFields({});
  }, [isOpen, user]);

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

  return (
    <AuthModalShell
      closeAriaLabel="Close profile modal"
      isOpen={isOpen}
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
          isSaveDisabled={isSaveDisabled}
          onAvatarChange={handleAvatarChange}
          onFieldBlur={handleFieldBlur}
          onFieldChange={handleFieldChange}
          user={user}
          values={values}
        />
      </div>
    </AuthModalShell>
  );
}
