import { useMutation } from "@tanstack/react-query";
import { isAxiosError, type AxiosError } from "axios";
import {
  registerUser,
  type RegisterApiRequest,
  type RegisterApiResponse,
} from "../api/auth/register";

type ValidationErrorResponse = {
  errors: Record<string, string[]>;
  message: string;
};

export type RegisterMutationError = AxiosError<ValidationErrorResponse> | Error;

export function useRegisterMutation() {
  return useMutation<
    RegisterApiResponse,
    RegisterMutationError,
    RegisterApiRequest
  >({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("succesfully registered ", data);
    },
  });
}

export function isRegisterValidationError(
  error: unknown,
): error is AxiosError<ValidationErrorResponse> {
  return (
    isAxiosError(error) &&
    error.response?.status === 422 &&
    typeof error.response.data?.errors === "object"
  );
}
