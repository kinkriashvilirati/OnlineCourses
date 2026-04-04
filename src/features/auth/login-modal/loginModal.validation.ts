import type { LoginErrors, LoginFormValues } from "./loginModal.types";

export const initialLoginFormValues: LoginFormValues = {
  email: "",
  password: "",
};

export function validateLoginForm(values: LoginFormValues) {
  const nextErrors: LoginErrors = {};

  if (!values.email.trim()) {
    nextErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    nextErrors.email = "Enter a valid email address";
  }

  if (!values.password.trim()) {
    nextErrors.password = "Password is required";
  } else if (values.password.trim().length < 3) {
    nextErrors.password = "Password must be at least 3 characters";
  }

  return nextErrors;
}
