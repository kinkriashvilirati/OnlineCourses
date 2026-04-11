import { useMutation } from "@tanstack/react-query";
import { isAxiosError, type AxiosError } from "axios";
import {
  loginUser,
  type LoginApiRequest,
  type LoginApiResponse,
} from "../../api/auth/login";

type LoginErrorResponse = {
  message: string;
};

export type LoginMutationError = AxiosError<LoginErrorResponse> | Error;

export function useLoginMutation() {
  return useMutation<LoginApiResponse, LoginMutationError, LoginApiRequest>({
    mutationFn: loginUser,
    // We do not invalidate `["auth", "me"]` here because the caller already
    // writes the returned user straight into the auth cache via setAuthenticatedSession.
  });
}

export function isLoginCredentialsError(
  error: unknown,
): error is AxiosError<LoginErrorResponse> {
  return (
    isAxiosError(error) &&
    error.response?.status === 401 &&
    typeof error.response.data?.message === "string"
  );
}
