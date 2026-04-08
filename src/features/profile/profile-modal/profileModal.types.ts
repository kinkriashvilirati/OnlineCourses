export type ProfileModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type ProfileEditableField = "age" | "fullName" | "mobileNumber";

export type ProfileFormValues = {
  age: string;
  email: string;
  fullName: string;
  mobileNumber: string;
};

export type ProfileErrors = Partial<Record<ProfileEditableField, string>>;

export type ProfileBlurredFields = Partial<
  Record<ProfileEditableField, boolean>
>;
