import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import { clearAccessToken, setAccessToken } from "../api/authSession";
import type { RegisterApiUser } from "../api/auth/register";

type AuthContextValue = {
  clearAuthenticatedSession: () => void;
  isAuthenticated: boolean;
  profileComplete: boolean;
  setAuthenticatedSession: (session: {
    token: string;
    user: RegisterApiUser;
  }) => void;
  user: RegisterApiUser | null;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [user, setUser] = useState<RegisterApiUser | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      clearAuthenticatedSession: () => {
        clearAccessToken();
        setUser(null);
      },
      isAuthenticated: user !== null,
      profileComplete: user?.profileComplete ?? false,
      setAuthenticatedSession: ({ token, user }) => {
        setAccessToken(token);
        setUser(user);
      },
      user,
    }),
    [user],
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
