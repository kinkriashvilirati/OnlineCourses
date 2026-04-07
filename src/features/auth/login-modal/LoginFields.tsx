import { AuthInputField } from "../shared/AuthInputField";

type LoginFieldsProps = {
  email: string;
  emailError?: string;
  onEmailChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  password: string;
  passwordError?: string;
  onBlur: () => void;
};

export function LoginFields({
  email,
  emailError,
  onEmailChange,
  onPasswordChange,
  password,
  passwordError,
  onBlur,
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
        onBlur={onBlur}
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
        onBlur={onBlur}
      />
    </div>
  );
}
