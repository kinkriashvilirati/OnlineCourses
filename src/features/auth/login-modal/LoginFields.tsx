import { AuthInputField } from "../shared/AuthInputField";

type LoginFieldsProps = {
  email: string;
  emailError?: string;
  onEmailChange: (value: string) => void;
  onEmailBlur: () => void;
  onPasswordChange: (value: string) => void;
  onPasswordBlur: () => void;
  password: string;
  passwordError?: string;
};

export function LoginFields({
  email,
  emailError,
  onEmailChange,
  onEmailBlur,
  onPasswordChange,
  onPasswordBlur,
  password,
  passwordError,
}: LoginFieldsProps) {
  return (
    <div className="space-y-4">
      <AuthInputField
        autoComplete="email"
        error={emailError}
        id="login-email"
        label="Email"
        onChange={onEmailChange}
        placeholder="you@example.com"
        type="email"
        value={email}
        onBlur={onEmailBlur}
      />

      <AuthInputField
        allowPasswordToggle
        autoComplete="current-password"
        error={passwordError}
        id="login-password"
        label="Password"
        onChange={onPasswordChange}
        placeholder="Password"
        type="password"
        value={password}
        onBlur={onPasswordBlur}
      />
    </div>
  );
}
