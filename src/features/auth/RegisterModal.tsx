import { useEffect, useState } from "react";
import modalCloseIcon from "../../assets/icons/icon-set/modal_close.svg";
import registerBackStep from "../../assets/icons/icon-set/register_back.svg";
import {
  getStepProgressClass,
  initialRegisterFormValues,
  registerStepTitles,
} from "./register-modal/registerModal.constants";
import type {
  RegisterErrors,
  RegisterFormValues,
  RegisterModalProps,
  RegisterStep,
} from "./register-modal/registerModal.types";
import {
  validateRegisterForm,
  validateRegisterStep,
} from "./register-modal/registerModal.validation";
import { RegisterEmailStep } from "./register-modal/steps/RegisterEmailStep";
import { RegisterPasswordStep } from "./register-modal/steps/RegisterPasswordStep";
import { RegisterProfileStep } from "./register-modal/steps/RegisterProfileStep";

function resetRegisterModalState(
  setStep: (step: RegisterStep) => void,
  setValues: (values: RegisterFormValues) => void,
  setErrors: (errors: RegisterErrors) => void,
) {
  setStep(1);
  setValues(initialRegisterFormValues);
  setErrors({});
}

export function RegisterModal({ isOpen, onClose }: RegisterModalProps) {
  const [step, setStep] = useState<RegisterStep>(1);
  const [values, setValues] = useState<RegisterFormValues>(
    initialRegisterFormValues,
  );
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function handleClose() {
    resetRegisterModalState(setStep, setValues, setErrors);
    onClose();
  }

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose, isOpen]);

  useEffect(() => {
    if (!values.avatarFile) {
      setAvatarPreviewUrl(null);
      return;
    }

    const objectUrl = URL.createObjectURL(values.avatarFile);
    setAvatarPreviewUrl(objectUrl);

    return () => {
      URL.revokeObjectURL(objectUrl);
    };
  }, [values.avatarFile]);

  const setFieldValue = <K extends keyof RegisterFormValues>(
    key: K,
    value: RegisterFormValues[K],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      [key === "avatarFile" ? "avatar" : key]: undefined,
    }));
  };

  const goToNextStep = () => {
    const nextErrors = validateRegisterStep(values, step);
    setErrors((currentErrors) => ({ ...currentErrors, ...nextErrors }));

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setStep((currentStep) =>
      currentStep < 3 ? ((currentStep + 1) as RegisterStep) : currentStep,
    );
  };

  const goToPreviousStep = () => {
    setStep((currentStep) =>
      currentStep > 1 ? ((currentStep - 1) as RegisterStep) : currentStep,
    );
  };

  const handleSubmit = () => {
    const nextErrors = validateRegisterForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    handleClose();
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center">
      <button
        aria-label="Close registration modal"
        className="absolute inset-0 bg-grayscale-950/45"
        onClick={handleClose}
        type="button"
      />

      <section
        aria-modal="true"
        className="relative z-10 w-full max-w-135 rounded-[20px] bg-grayscale-50 px-8 pb-7 pt-4 shadow-[0_30px_80px_rgba(20,20,20,0.22)]"
        role="dialog"
      >
        <div className="flex items-center justify-between">
          {step > 1 ? (
            <button
              aria-label="Previous registration  step"
              className="flex h-7 w-7 items-center justify-center rounded-full text-grayscale-600 transition-colors duration-200 hover:bg-grayscale-100 cursor-pointer hover:text-grayscale-900"
              onClick={goToPreviousStep}
              type="button"
            >
              <img src={registerBackStep} alt="" />
            </button>
          ) : (
            <span className="h-7 w-7" />
          )}

          <button
            aria-label="Close registration modal"
            className="flex h-7 w-7 cursor-pointer items-center justify-center rounded-full text-grayscale-600 transition-colors duration-200 hover:bg-grayscale-100 hover:text-grayscale-900"
            onClick={handleClose}
            type="button"
          >
            <img src={modalCloseIcon} alt="" />
          </button>
        </div>

        <div className="mt-1 text-center gap-1.5">
          <h2 className="text-h2">Create Account</h2>
          <p className="text-body-xs text-grayscale-500">
            {registerStepTitles[step]}
          </p>
        </div>

        <div className="mt-5 flex gap-1.5">
          {[1, 2, 3].map((segment) => (
            <span
              className={getStepProgressClass(step, segment)}
              key={segment}
            />
          ))}
        </div>

        <div className="mt-6">
          {step === 1 ? (
            <RegisterEmailStep
              email={values.email}
              error={errors.email}
              onChange={(value) => setFieldValue("email", value)}
            />
          ) : null}

          {step === 2 ? (
            <RegisterPasswordStep
              confirmPassword={values.confirmPassword}
              confirmPasswordError={errors.confirmPassword}
              onConfirmPasswordChange={(value) =>
                setFieldValue("confirmPassword", value)
              }
              onPasswordChange={(value) => setFieldValue("password", value)}
              password={values.password}
              passwordError={errors.password}
            />
          ) : null}

          {step === 3 ? (
            <RegisterProfileStep
              avatarError={errors.avatar}
              avatarFileName={values.avatarFile?.name}
              avatarPreviewUrl={avatarPreviewUrl}
              onAvatarChange={(event) =>
                setFieldValue("avatarFile", event.target.files?.[0] ?? null)
              }
              onUsernameChange={(value) => setFieldValue("username", value)}
              username={values.username}
              usernameError={errors.username}
            />
          ) : null}
        </div>

        <button
          className="button-primary mt-6 flex h-12 w-full items-center justify-center text-button-s"
          onClick={step === 3 ? handleSubmit : goToNextStep}
          type="button"
        >
          {step === 3 ? "Sign Up" : "Next"}
        </button>

        <div className="mt-4 text-center">
          <span className="text-helper-regular text-grayscale-300">or</span>
          <p className="mt-3 text-helper-regular text-grayscale-500">
            Already have an account?{" "}
            <button
              className="font-semibold text-grayscale-900 underline"
              type="button"
            >
              Log In
            </button>
          </p>
        </div>
      </section>
    </div>
  );
}
