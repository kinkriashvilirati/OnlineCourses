import type { RegisterFormValues, RegisterStep } from "./registerModal.types";

export const initialRegisterFormValues: RegisterFormValues = {
  email: "",
  password: "",
  confirmPassword: "",
  username: "",
  avatarFile: null,
};

export const allowedAvatarTypes = ["image/jpeg", "image/png", "image/webp"];

export const registerStepTitles: Record<RegisterStep, string> = {
  1: "Join and start learning today",
  2: "Secure your account with a password",
  3: "Finish your profile basics",
};

export function getStepProgressClass(step: RegisterStep, segment: number) {
  return [
    "h-1.5 flex-1 rounded-full transition-colors duration-200",
    segment <= step ? "bg-purple-200" : "bg-purple-50",
  ].join(" ");
}
