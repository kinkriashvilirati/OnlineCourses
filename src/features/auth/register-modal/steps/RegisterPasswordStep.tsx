import { RegisterInputField } from "../RegisterInputField";

type RegisterPasswordStepProps = {
  confirmPassword: string;
  confirmPasswordError?: string;
  onConfirmPasswordChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  password: string;
  passwordError?: string;
};

export function RegisterPasswordStep({
  confirmPassword,
  confirmPasswordError,
  onConfirmPasswordChange,
  onPasswordChange,
  password,
  passwordError,
}: RegisterPasswordStepProps) {
  return (
    <div className="space-y-4">
      <RegisterInputField
        allowPasswordToggle
        error={passwordError}
        id="register-password"
        label="Password*"
        onChange={onPasswordChange}
        placeholder="Password"
        type="password"
        value={password}
      />

      <RegisterInputField
        allowPasswordToggle
        error={confirmPasswordError}
        id="register-confirm-password"
        label="Confirm Password*"
        onChange={onConfirmPasswordChange}
        placeholder="Confirm Password"
        type="password"
        value={confirmPassword}
      />
    </div>
  );
}
