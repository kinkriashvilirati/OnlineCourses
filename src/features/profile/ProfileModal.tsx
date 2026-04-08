import { useCallback, useEffect, useState, type ChangeEvent } from "react";
import { useAuth } from "../../context/AuthContext";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";
import { AuthModalShell } from "../auth/auth-modal/AuthModalShell";
import { ProfileModalFields } from "./profile-modal/ProfileModalFields";
import { ProfileModalHeader } from "./profile-modal/ProfileModalHeader";
import type { ProfileModalProps } from "./profile-modal/profileModal.types";

function resetProfileModalState(
  setAvatarFile: (file: File | null) => void,
  setAvatarPreviewUrl: (url: string | null) => void,
) {
  setAvatarFile(null);
  setAvatarPreviewUrl(null);
}

export function ProfileModal({ isOpen, onClose }: ProfileModalProps) {
  const { profileComplete, user } = useAuth();
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    resetProfileModalState(setAvatarFile, setAvatarPreviewUrl);
    onClose();
  }, [onClose]);

  useAuthModalLifecycle(isOpen, handleClose);

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
          onAvatarChange={handleAvatarChange}
          user={user}
        />
      </div>
    </AuthModalShell>
  );
}
