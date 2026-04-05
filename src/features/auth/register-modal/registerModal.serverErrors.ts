import type { RegisterErrors, RegisterFieldErrorKey } from "./registerModal.types";

const registerApiFieldMap: Record<string, RegisterFieldErrorKey> = {
  avatar: "avatar",
  email: "email",
  password: "password",
  password_confirmation: "confirmPassword",
  username: "username",
};

export function mapRegisterValidationErrors(
  apiErrors: Record<string, string[]>,
): RegisterErrors {
  const nextErrors: RegisterErrors = {};

  for (const [apiKey, messages] of Object.entries(apiErrors)) {
    const fieldKey = registerApiFieldMap[apiKey];

    if (!fieldKey || messages.length === 0) {
      continue;
    }

    nextErrors[fieldKey] = messages[0];
  }

  return nextErrors;
}
