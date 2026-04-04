import { AuthInputField } from "../../shared/AuthInputField";

type RegisterEmailStepProps = {
  email: string;
  error?: string;
  onChange: (value: string) => void;
};

export function RegisterEmailStep({
  email,
  error,
  onChange,
}: RegisterEmailStepProps) {
  return (
    <AuthInputField
      error={error}
      id="register-email"
      label="Email*"
      onChange={onChange}
      placeholder="you@example.com"
      type="email"
      value={email}
    />
  );
}
