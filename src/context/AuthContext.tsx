import {
  useEffect,
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { isAxiosError } from "axios";
import {
  clearAccessToken,
  getAccessToken,
  setAccessToken,
} from "../api/authSession";
import type { CurrentUserApiResponse } from "../api/auth/me";
import type { RegisterApiUser } from "../api/auth/register";
import { useCurrentUserQuery } from "../hooks/useCurrentUserQuery";

type AuthContextValue = {
  clearAuthenticatedSession: () => void;
  isAuthenticated: boolean;
  isAuthRestoring: boolean;
  profileComplete: boolean;
  setAuthenticatedSession: (session: {
    token: string;
    user: RegisterApiUser;
  }) => void;
  updateUser: (user: RegisterApiUser) => void;
  user: RegisterApiUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const queryClient = useQueryClient();
  const [user, setUser] = useState<RegisterApiUser | null>(null);
  const hasStoredToken = Boolean(getAccessToken());

  const currentUserQuery = useCurrentUserQuery(hasStoredToken && user === null);

  const resolvedUser = user ?? currentUserQuery.data?.data ?? null;
  const isAuthRestoring =
    hasStoredToken && user === null && currentUserQuery.isPending;

  useEffect(() => {
    if (!currentUserQuery.isError) {
      return;
    }

    if (
      isAxiosError(currentUserQuery.error) &&
      currentUserQuery.error.response?.status === 401
    ) {
      clearAccessToken();
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setUser(null);
      queryClient.removeQueries({ queryKey: ["auth", "me"] });
    }
  }, [currentUserQuery.error, currentUserQuery.isError, queryClient]);

  const value = useMemo<AuthContextValue>(
    () => ({
      clearAuthenticatedSession: () => {
        clearAccessToken();
        queryClient.removeQueries({ queryKey: ["auth", "me"] });
        setUser(null);
      },
      isAuthenticated: resolvedUser !== null,
      isAuthRestoring,
      profileComplete: resolvedUser?.profileComplete ?? false,
      setAuthenticatedSession: ({ token, user }) => {
        setAccessToken(token);
        queryClient.setQueryData<CurrentUserApiResponse>(["auth", "me"], {
          data: user,
        });
        setUser(user);
      },
      updateUser: (user: RegisterApiUser) => {
        queryClient.setQueryData<CurrentUserApiResponse>(["auth", "me"], {
          data: user,
        });
        setUser(user);
      },
      user: resolvedUser,
    }),
    [isAuthRestoring, queryClient, resolvedUser],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}
