import { allowedAvatarTypes } from "./registerModal.constants";
import type {
  RegisterErrors,
  RegisterFormValues,
  RegisterStep,
} from "./registerModal.types";

export function validateRegisterStep(
  values: RegisterFormValues,
  step: RegisterStep,
) {
  const nextErrors: RegisterErrors = {};

  if (step === 1) {
    if (!values.email.trim()) {
      nextErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = "Enter a valid email address";
    }
  }

  if (step === 2) {
    if (!values.password.trim()) {
      nextErrors.password = "Password is required";
    } else if (values.password.trim().length < 3) {
      nextErrors.password = "Password must be at least 3 characters";
    }

    if (!values.confirmPassword.trim()) {
      nextErrors.confirmPassword = "Please confirm your password";
    } else if (values.confirmPassword !== values.password) {
      nextErrors.confirmPassword = "Passwords do not match";
    }
  }

  if (step === 3) {
    if (!values.username.trim()) {
      nextErrors.username = "Username is required";
    } else if (values.username.trim().length < 3) {
      nextErrors.username = "Username must be at least 3 characters";
    }

    if (values.avatarFile && !allowedAvatarTypes.includes(values.avatarFile.type)) {
      nextErrors.avatar = "Avatar must be JPG, PNG, or WEBP";
    }
  }

  return nextErrors;
}

export function validateRegisterForm(values: RegisterFormValues) {
  return {
    ...validateRegisterStep(values, 1),
    ...validateRegisterStep(values, 2),
    ...validateRegisterStep(values, 3),
  };
}
