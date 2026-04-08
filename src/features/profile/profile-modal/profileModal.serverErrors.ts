import type { ProfileErrors } from "./profileModal.types";

type ProfileValidationErrorMap = Record<string, string[]>;

export function mapProfileValidationErrors(
  errors: ProfileValidationErrorMap,
) {
  const nextErrors: ProfileErrors = {};

  if (errors.full_name?.[0]) {
    nextErrors.fullName = errors.full_name[0];
  }

  if (errors.mobile_number?.[0]) {
    nextErrors.mobileNumber = errors.mobile_number[0];
  }

  if (errors.age?.[0]) {
    nextErrors.age = errors.age[0];
  }

  if (errors.avatar?.[0]) {
    nextErrors.avatar = errors.avatar[0];
  }

  return nextErrors;
}
