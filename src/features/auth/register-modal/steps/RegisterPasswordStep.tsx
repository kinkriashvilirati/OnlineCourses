import { AuthInputField } from "../../shared/AuthInputField";

type RegisterPasswordStepProps = {
  confirmPassword: string;
  confirmPasswordError?: string;
  onConfirmPasswordChange: (value: string) => void;
  onConfirmPasswordBlur: () => void;
  onPasswordChange: (value: string) => void;
  onPasswordBlur: () => void;
  password: string;
  passwordError?: string;
};

export function RegisterPasswordStep({
  confirmPassword,
  confirmPasswordError,
  onConfirmPasswordChange,
  onConfirmPasswordBlur,
  onPasswordChange,
  password,
  passwordError,
  onPasswordBlur,
}: RegisterPasswordStepProps) {
  return (
    <div className="space-y-4">
      <AuthInputField
        allowPasswordToggle
        error={passwordError}
        id="register-password"
        label="Password*"
        onChange={onPasswordChange}
        onBlur={onPasswordBlur}
        placeholder="Password"
        type="password"
        value={password}
      />

      <AuthInputField
        allowPasswordToggle
        error={confirmPasswordError}
        id="register-confirm-password"
        label="Confirm Password*"
        onChange={onConfirmPasswordChange}
        onBlur={onConfirmPasswordBlur}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
      />
    </div>
  );
}
