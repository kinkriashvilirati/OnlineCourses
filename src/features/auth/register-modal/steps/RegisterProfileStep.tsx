import { useState, type ChangeEvent } from "react";
import { AuthInputField } from "../../shared/AuthInputField";
import AvatarInput from "../../../../components/shared/AvatarInput";
type RegisterProfileStepProps = {
  avatarError?: string;
  avatarFileName?: string;
  avatarPreviewUrl: string | null;
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (value: string) => void;
  username: string;
  usernameError?: string;
  onBlur: () => void;
};

export function RegisterProfileStep({
  avatarError,
  avatarFileName,
  avatarPreviewUrl,
  onAvatarChange,
  onUsernameChange,
  username,
  usernameError,
  onBlur,
}: RegisterProfileStepProps) {
  const [avatarSize, setAvatarSize] = useState<number | null>(null);
  return (
    <div className="space-y-4">
      <AuthInputField
        error={usernameError}
        id="register-username"
        label="Username*"
        onChange={onUsernameChange}
        placeholder="Username"
        type="text"
        value={username}
        onBlur={onBlur}
      />

      <div>
        <p className="mb-2 text-helper-medium text-grayscale-700">
          Upload Avatar
        </p>
        <AvatarInput
          avatarError={avatarError}
          avatarFileName={avatarFileName}
          avatarPreviewUrl={avatarPreviewUrl}
          avatarSize={avatarSize}
          inputId="register-avatar"
        />
        <input
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          id="register-avatar"
          onChange={(e) => {
            onAvatarChange(e);
            setAvatarSize(e.target.files?.[0]?.size ?? null);
          }}
          type="file"
        />

        {avatarError ? (
          <p className="mt-2 text-helper-regular text-helper-error">
            {avatarError}
          </p>
        ) : null}
      </div>
    </div>
  );
}
