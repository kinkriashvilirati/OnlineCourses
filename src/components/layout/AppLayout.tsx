import { useState } from "react";
import { Outlet } from "react-router";
import { RegisterModal } from "../../features/auth/RegisterModal";
import { GuestNavigation } from "./GuestNavigation";

export function AppLayout() {
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-grayscale-100 ">
      <GuestNavigation
        onOpenRegisterModal={() => setIsRegisterModalOpen(true)}
      />

      <main className="px-44.25 pt-27 mb-1000">
        <Outlet />
      </main>

      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
      />
    </div>
  );
}
