import type { LoginMutationError } from "../../../hooks/useLoginMutation";

export function getLoginErrorMessage(error: LoginMutationError) {
  if ("response" in error && error.response?.data?.message) {
    return error.response.data.message;
  }

  return "Login failed. Please try again.";
}
