import type { RegisterApiUser } from "../../../api/auth/register";
import type {
  ProfileEditableField,
  ProfileErrors,
  ProfileFormValues,
} from "./profileModal.types";

const allowedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];
const maxAvatarSize = 2 * 1024 * 1024;

function normalizeMobileNumber(value: string) {
  return value.replace(/\s+/g, "");
}

export function getInitialProfileFormValues(
  user: RegisterApiUser | null,
): ProfileFormValues {
  return {
    age: user?.age !== null && user?.age !== undefined ? String(user.age) : "",
    email: user?.email ?? "",
    fullName: user?.fullName?.trim() || user?.username || "",
    mobileNumber: user?.mobileNumber
      ? user.mobileNumber.replace(/^\+?995\s?/, "")
      : "",
  };
}

export function validateProfileField(
  values: ProfileFormValues,
  field: ProfileEditableField,
) {
  if (field === "fullName") {
    const fullName = values.fullName.trim();

    if (!fullName) {
      return "Name is required";
    }

    if (fullName.length < 3) {
      return "Name must be at least 3 characters";
    }

    if (fullName.length > 50) {
      return "Name must not exceed 50 characters";
    }
  }

  if (field === "mobileNumber") {
    const mobileNumber = normalizeMobileNumber(values.mobileNumber);

    if (!mobileNumber) {
      return "Mobile number is required";
    }

    if (!/^\d+$/.test(mobileNumber)) {
      return "Please enter a valid Georgian mobile number (9 digits starting with 5)";
    }

    if (!mobileNumber.startsWith("5")) {
      return "Georgian mobile numbers must start with 5";
    }

    if (mobileNumber.length !== 9) {
      return "Mobile number must be exactly 9 digits";
    }
  }

  if (field === "age") {
    const age = values.age.trim();

    if (!age) {
      return "Age is required";
    }

    if (!/^\d+$/.test(age)) {
      return "Age must be a number";
    }

    const numericAge = Number(age);

    if (numericAge < 16) {
      return "You must be at least 16 years old to enroll";
    }

    if (numericAge > 120) {
      return "Please enter a valid age";
    }
  }

  return undefined;
}

export function validateProfileForm(values: ProfileFormValues) {
  const nextErrors: ProfileErrors = {};

  const fullNameError = validateProfileField(values, "fullName");
  if (fullNameError) {
    nextErrors.fullName = fullNameError;
  }

  const mobileNumberError = validateProfileField(values, "mobileNumber");
  if (mobileNumberError) {
    nextErrors.mobileNumber = mobileNumberError;
  }

  const ageError = validateProfileField(values, "age");
  if (ageError) {
    nextErrors.age = ageError;
  }

  return nextErrors;
}

export function validateProfileAvatar(file: File | null) {
  if (!file) {
    return undefined;
  }

  if (!allowedAvatarTypes.includes(file.type)) {
    return "Avatar must be a jpg, jpeg, png, or webp image";
  }

  if (file.size > maxAvatarSize) {
    return "Avatar must be smaller than 2MB";
  }

  return undefined;
}
