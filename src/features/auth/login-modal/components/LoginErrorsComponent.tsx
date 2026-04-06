import type { LoginErrors } from "../loginModal.types";

export default function LoginErrorsComponent({
  errors,
}: {
  errors: LoginErrors;
}) {
  if (!errors.form) {
    return null;
  }

  return (
    <p className="mt-3 text-center text-helper-regular text-helper-error">
      {errors.form}
    </p>
  );
}
