export type LoginModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
};

export type LoginFieldErrorKey = "email" | "password";

export type LoginFormValues = {
  email: string;
  password: string;
};

export type LoginErrors = Partial<Record<LoginFieldErrorKey, string>>;
