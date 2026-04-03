import type { ChangeEvent } from "react";
import { RegisterInputField } from "../RegisterInputField";

type RegisterProfileStepProps = {
  avatarError?: string;
  avatarFileName?: string;
  avatarPreviewUrl: string | null;
  onAvatarChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onUsernameChange: (value: string) => void;
  username: string;
  usernameError?: string;
};

export function RegisterProfileStep({
  avatarError,
  avatarFileName,
  avatarPreviewUrl,
  onAvatarChange,
  onUsernameChange,
  username,
  usernameError,
}: RegisterProfileStepProps) {
  return (
    <div className="space-y-4">
      <RegisterInputField
        error={usernameError}
        id="register-username"
        label="Username*"
        onChange={onUsernameChange}
        placeholder="Username"
        type="text"
        value={username}
      />

      <div>
        <p className="mb-2 text-helper-medium text-grayscale-700">
          Upload Avatar
        </p>

        <label
          className={[
            "flex min-h-33.75 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed bg-grayscale-50 px-4 py-6 text-center transition-colors duration-200",
            avatarError
              ? "border-helper-error"
              : "border-grayscale-200 hover:border-purple-300",
          ].join(" ")}
          htmlFor="register-avatar"
        >
          {avatarPreviewUrl ? (
            <>
              <img
                alt="Avatar preview"
                className="h-14 w-14 rounded-full object-cover"
                src={avatarPreviewUrl}
              />
              <p className="mt-3 text-helper-medium text-grayscale-700">
                {avatarFileName}
              </p>
              <p className="mt-1 text-helper-regular text-purple-500">
                Choose another file
              </p>
            </>
          ) : (
            <>
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-grayscale-100 text-lg text-grayscale-500">
                ^
              </div>
              <p className="mt-3 text-helper-medium text-grayscale-700">
                Drag and drop or{" "}
                <span className="text-purple-500 underline">Upload file</span>
              </p>
              <p className="mt-1 text-helper-regular text-grayscale-400">
                JPG, PNG or WEBP
              </p>
            </>
          )}
        </label>

        <input
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          id="register-avatar"
          onChange={onAvatarChange}
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
