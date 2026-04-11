import { useMutation } from "@tanstack/react-query";
import type { AxiosError } from "axios";
import { logoutUser } from "../../api/auth/logout";
import { useAuth } from "../../context/AuthContext";
export type LogoutMutationError = AxiosError | Error;

type HandleClose = () => void;
export function useLogoutMutation(handleClose: HandleClose) {
  const { clearAuthenticatedSession } = useAuth();
  return useMutation<void, LogoutMutationError, void>({
    mutationFn: logoutUser,
    onSettled: () => {
      clearAuthenticatedSession();
      handleClose();
    },
  });
}
