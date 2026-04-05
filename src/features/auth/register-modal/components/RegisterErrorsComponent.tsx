import type { RegisterErrors } from "../registerModal.types";

export default function RegisterErrorsComponent({
  errors,
}: {
  errors: RegisterErrors;
}) {
  return (
    <>
      {errors.username || errors.avatar ? (
        <></>
      ) : errors.email ? (
        <p className="mt-3 text-center text-helper-regular text-helper-error">
          {errors.email}
        </p>
      ) : errors.password ? (
        <p className="mt-3 text-center text-helper-regular text-helper-error">
          {errors.password}
        </p>
      ) : errors.confirmPassword ? (
        <p className="mt-3 text-center text-helper-regular text-helper-error">
          {errors.confirmPassword}
        </p>
      ) : errors.form ? (
        <p className="mt-3 text-center text-helper-regular text-helper-error">
          {errors.form}
        </p>
      ) : null}
    </>
  );
}
