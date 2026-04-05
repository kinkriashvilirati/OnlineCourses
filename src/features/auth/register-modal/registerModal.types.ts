export type RegisterModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
};

export type RegisterStep = 1 | 2 | 3;

export type RegisterFieldErrorKey =
  | "form"
  | "email"
  | "password"
  | "confirmPassword"
  | "username"
  | "avatar";

export type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
  username: string;
  avatarFile: File | null;
};

export type RegisterErrors = Partial<Record<RegisterFieldErrorKey, string>>;
