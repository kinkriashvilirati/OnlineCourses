import { useCallback, useState } from "react";
import { AuthModalShell } from "./auth-modal/AuthModalShell";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";
import { useAuth } from "../../context/AuthContext";
import { LoginFields } from "./login-modal/LoginFields";
import LoginErrorsComponent from "./login-modal/components/LoginErrorsComponent";
import { getLoginErrorMessage } from "./login-modal/loginModal.serverErrors";
import {
  initialLoginFormValues,
  validateLoginForm,
} from "./login-modal/loginModal.validation";
import type {
  LoginErrors,
  LoginFormValues,
  LoginModalProps,
} from "./login-modal/loginModal.types";
import {
  isLoginCredentialsError,
  type LoginMutationError,
  useLoginMutation,
} from "../../hooks/mutation-hooks/useLoginMutation";

function resetLoginModalState(
  setValues: (values: LoginFormValues) => void,
  setErrors: (errors: LoginErrors) => void,
) {
  setValues(initialLoginFormValues);
  setErrors({});
}

export function LoginModal({
  isOpen,
  onClose,
  onSwitchToRegister,
}: LoginModalProps) {
  const { setAuthenticatedSession } = useAuth();
  const loginMutation = useLoginMutation();
  const [values, setValues] = useState<LoginFormValues>(initialLoginFormValues);
  const [errors, setErrors] = useState<LoginErrors>({});

  const handleClose = useCallback(() => {
    resetLoginModalState(setValues, setErrors);
    loginMutation.reset();
    onClose();
  }, [loginMutation, onClose]);

  const handleSwitchToRegister = useCallback(() => {
    resetLoginModalState(setValues, setErrors);
    loginMutation.reset();
    onSwitchToRegister();
  }, [loginMutation, onSwitchToRegister]);

  useAuthModalLifecycle(isOpen, handleClose);

  const setFieldValue = <K extends keyof LoginFormValues>(
    key: K,
    value: LoginFormValues[K],
  ) => {
    setValues((currentValues) => ({
      ...currentValues,
      [key]: value,
    }));

    setErrors((currentErrors) => ({
      ...currentErrors,
      form: undefined,
      [key]: undefined,
    }));
  };

  const handleEmailBlur = () => {
    const nextErrors = validateLoginForm(values);

    setErrors((currentErrors) => ({
      ...currentErrors,
      email: nextErrors.email,
    }));
  };

  const handlePasswordBlur = () => {
    const nextErrors = validateLoginForm(values);

    setErrors((currentErrors) => ({
      ...currentErrors,
      password: nextErrors.password,
    }));
  };

  const handleSubmit = async () => {
    const nextErrors = validateLoginForm(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    try {
      const response = await loginMutation.mutateAsync({
        email: values.email.trim(),
        password: values.password,
      });

      setAuthenticatedSession({
        token: response.data.token,
        user: response.data.user,
      });

      handleClose();
    } catch (error) {
      if (isLoginCredentialsError(error)) {
        setErrors({
          form: error.response?.data.message ?? "Invalid credentials.",
        });
        return;
      }

      setErrors({
        form: getLoginErrorMessage(error as LoginMutationError),
      });
    }
  };

  return (
    <AuthModalShell
      closeAriaLabel="Close login modal"
      description="Log in to continue your learning"
      isOpen={isOpen}
      onClose={handleClose}
      title="Welcome Back"
    >
      <div className="mt-6">
        <LoginFields
          email={values.email}
          emailError={errors.email}
          onEmailChange={(value) => setFieldValue("email", value)}
          onEmailBlur={handleEmailBlur}
          onPasswordChange={(value) => setFieldValue("password", value)}
          onPasswordBlur={handlePasswordBlur}
          password={values.password}
          passwordError={errors.password}
        />
      </div>

      <button
        className="button-primary mt-6 flex h-12 w-full items-center justify-center text-button-s"
        onClick={handleSubmit}
        disabled={loginMutation.isPending}
        type="button"
      >
        {loginMutation.isPending ? "Logging In..." : "Log In"}
      </button>

      <LoginErrorsComponent errors={errors} />

      <div className="mt-6">
        <div className="flex items-center gap-3">
          <span className="h-px flex-1 bg-grayscale-200" />
          <span className="text-helper-regular text-grayscale-300">or</span>
          <span className="h-px flex-1 bg-grayscale-200" />
        </div>

        <p className="mt-4 text-center text-helper-regular text-grayscale-500">
          Don&apos;t have an account?{" "}
          <button
            className="font-semibold text-underline-s cursor-pointer"
            onClick={handleSwitchToRegister}
            type="button"
          >
            Sign Up
          </button>
        </p>
      </div>
    </AuthModalShell>
  );
}
