export type ProfileEditableField = "age" | "fullName" | "mobileNumber";
export type ProfileErrorField = ProfileEditableField | "avatar";

export type ProfileFormValues = {
  age: string;
  email: string;
  fullName: string;
  mobileNumber: string;
};

export type ProfileErrors = Partial<Record<ProfileErrorField, string>>;

export type ProfileBlurredFields = Partial<
  Record<ProfileEditableField, boolean>
>;
