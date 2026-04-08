import { useMutation } from "@tanstack/react-query";
import { isAxiosError, type AxiosError } from "axios";
import {
  updateProfile,
  type UpdateProfileApiRequest,
  type UpdateProfileApiResponse,
} from "../api/profile/updateProfile";

type ProfileValidationErrorResponse = {
  errors: Record<string, string[]>;
  message: string;
};

export type UpdateProfileMutationError =
  | AxiosError<ProfileValidationErrorResponse>
  | Error;

export function useUpdateProfileMutation() {
  return useMutation<
    UpdateProfileApiResponse,
    UpdateProfileMutationError,
    UpdateProfileApiRequest
  >({
    mutationFn: updateProfile,
  });
}

export function isUpdateProfileValidationError(
  error: unknown,
): error is AxiosError<ProfileValidationErrorResponse> {
  return (
    isAxiosError(error) &&
    error.response?.status === 422 &&
    typeof error.response.data?.errors === "object"
  );
}
