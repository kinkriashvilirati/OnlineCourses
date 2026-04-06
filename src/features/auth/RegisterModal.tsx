import { useCallback, useEffect, useState } from "react";
import { AuthModalShell } from "./auth-modal/AuthModalShell";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";
import { useAuth } from "../../context/AuthContext";
import {
  getStepProgressClass,
  initialRegisterFormValues,
  registerStepTitles,
} from "./register-modal/registerModal.constants";
import { mapRegisterValidationErrors } from "./register-modal/registerModal.serverErrors";
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
import {
  isRegisterValidationError,
  useRegisterMutation,
} from "../../hooks/useRegisterMutation";
import RegisterErrorsComponent from "./register-modal/components/RegisterErrorsComponent";

function resetRegisterModalState(
  setStep: (step: RegisterStep) => void,
  setValues: (values: RegisterFormValues) => void,
  setErrors: (errors: RegisterErrors) => void,
) {
  setStep(1);
  setValues(initialRegisterFormValues);
  setErrors({});
}

export function RegisterModal({
  isOpen,
  onClose,
  onSwitchToLogin,
}: RegisterModalProps) {
  const { setAuthenticatedSession } = useAuth();
  const registerMutation = useRegisterMutation();
  const [step, setStep] = useState<RegisterStep>(1);
  const [values, setValues] = useState<RegisterFormValues>(
    initialRegisterFormValues,
  );
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string | null>(null);

  const handleClose = useCallback(() => {
    resetRegisterModalState(setStep, setValues, setErrors);
    registerMutation.reset();
    onClose();
  }, [onClose, registerMutation]);

  const handleSwitchToLogin = useCallback(() => {
    resetRegisterModalState(setStep, setValues, setErrors);
    registerMutation.reset();
    onSwitchToLogin();
  }, [onSwitchToLogin, registerMutation]);

  useAuthModalLifecycle(isOpen, handleClose);

  useEffect(() => {
    if (!values.avatarFile) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
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
      form: undefined,
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

  const handleSubmit = async () => {
    const nextErrors = validateRegisterForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const response = await registerMutation.mutateAsync({
        avatar: values.avatarFile,
        email: values.email.trim(),
        password: values.password,
        password_confirmation: values.confirmPassword,
        username: values.username.trim(),
      });

      setAuthenticatedSession({
        token: response.data.token,
        user: response.data.user,
      });

      handleClose();
    } catch (error) {
      if (isRegisterValidationError(error)) {
        const response = error.response;
        if (!response) {
          setErrors({
            form: "Registration failed. Please try again.",
          });
          return;
        }

        const mappedErrors = mapRegisterValidationErrors(response.data.errors);

        setErrors({
          ...mappedErrors,
          form:
            Object.keys(mappedErrors).length === 0
              ? response.data.message
              : undefined,
        });

        return;
      }

      setErrors({
        form: "Registration failed. Please try again.",
      });
    }
  };

  return (
    <AuthModalShell
      backAriaLabel="Previous registration step"
      closeAriaLabel="Close registration modal"
      description={registerStepTitles[step]}
      headerSlot={
        <div className="mt-5 flex gap-1.5">
          {[1, 2, 3].map((segment) => (
            <span
              className={getStepProgressClass(step, segment)}
              key={segment}
            />
          ))}
        </div>
      }
      isOpen={isOpen}
      onBack={step > 1 ? goToPreviousStep : undefined}
      onClose={handleClose}
      title="Create Account"
    >
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
        disabled={step === 3 ? registerMutation.isPending : false}
        type="button"
      >
        {step === 3
          ? registerMutation.isPending
            ? "Signing Up..."
            : "Sign Up"
          : "Next"}
      </button>

      <RegisterErrorsComponent errors={errors} />

      <div className="mt-4 text-center">
        <span className="text-helper-regular text-grayscale-300">or</span>
        <p className="mt-3 text-helper-regular text-grayscale-500">
          Already have an account?{" "}
          <button
            className="text-underline-s cursor-pointer"
            onClick={handleSwitchToLogin}
            type="button"
          >
            Log In
          </button>
        </p>
      </div>
    </AuthModalShell>
  );
}
