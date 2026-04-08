import { useAuthModal } from "../../context/AuthModalContext";
import { LoginModal } from "./LoginModal";
import { ProfileModal } from "../profile/ProfileModal";
import { RegisterModal } from "./RegisterModal";

export function AuthModalHost() {
  const {
    closeAuthModal,
    isLoginModalOpen,
    isRegisterModalOpen,
    switchToLoginModal,
    switchToRegisterModal,
  } = useAuthModal();

  return (
    <>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={closeAuthModal}
        onSwitchToRegister={switchToRegisterModal}
      />

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={closeAuthModal}
        onSwitchToLogin={switchToLoginModal}
      />

      <ProfileModal />
    </>
  );
}
