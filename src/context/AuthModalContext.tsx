import {
  createContext,
  useContext,
  useMemo,
  useState,
  type PropsWithChildren,
} from "react";
import type { AuthModalType } from "../features/auth/auth-modal/authModal.types";

type AuthModalContextValue = {
  activeModal: AuthModalType;
  closeAuthModal: () => void;
  closeProfileModal: () => void;
  isLoginModalOpen: boolean;
  isProfileModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  openProfileModal: () => void;
  openRegisterModal: () => void;
  switchToLoginModal: () => void;
  switchToRegisterModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: PropsWithChildren) {
  const [activeModal, setActiveModal] = useState<AuthModalType>(null);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      activeModal,
      closeAuthModal: () => setActiveModal(null),
      closeProfileModal: () => setActiveModal(null),
      isLoginModalOpen: activeModal === "login",
      isProfileModalOpen: activeModal === "profile",
      isRegisterModalOpen: activeModal === "register",
      openLoginModal: () => setActiveModal("login"),
      openProfileModal: () => setActiveModal("profile"),
      openRegisterModal: () => setActiveModal("register"),
      switchToLoginModal: () => setActiveModal("login"),
      switchToRegisterModal: () => setActiveModal("register"),
    }),
    [activeModal],
  );

  return (
    <AuthModalContext.Provider value={value}>
      {children}
    </AuthModalContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuthModal() {
  const context = useContext(AuthModalContext);

  if (!context) {
    throw new Error("useAuthModal must be used within AuthModalProvider");
  }

  return context;
}
