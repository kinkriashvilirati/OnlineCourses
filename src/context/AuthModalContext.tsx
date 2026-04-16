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
  isPanelOpen: boolean;
  isProfileModalOpen: boolean;
  isRegisterModalOpen: boolean;
  openLoginModal: () => void;
  openProfileModal: () => void;
  openRegisterModal: () => void;
  setIsPanelOpen: React.Dispatch<React.SetStateAction<boolean>>;
  switchToLoginModal: () => void;
  switchToRegisterModal: () => void;
};

const AuthModalContext = createContext<AuthModalContextValue | null>(null);

export function AuthModalProvider({ children }: PropsWithChildren) {
  const [activeModal, setActiveModal] = useState<AuthModalType>(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const value = useMemo<AuthModalContextValue>(
    () => ({
      activeModal,
      closeAuthModal: () => setActiveModal(null),
      closeProfileModal: () => setActiveModal(null),
      isLoginModalOpen: activeModal === "login",
      isPanelOpen,
      isProfileModalOpen: activeModal === "profile",
      isRegisterModalOpen: activeModal === "register",
      openLoginModal: () => setActiveModal("login"),
      openProfileModal: () => setActiveModal("profile"),
      openRegisterModal: () => setActiveModal("register"),
      setIsPanelOpen,
      switchToLoginModal: () => setActiveModal("login"),
      switchToRegisterModal: () => setActiveModal("register"),
    }),
    [activeModal, isPanelOpen],
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
