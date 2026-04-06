import { Outlet } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { AuthModalProvider } from "../../context/AuthModalContext";
import { AuthModalHost } from "../../features/auth/AuthModalHost";
import { GuestNavigation } from "./GuestNavigation";

export function AppLayout() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <div className="min-h-screen bg-grayscale-100 ">
          <GuestNavigation />

          <main className="px-44.25 pt-27 mb-1000">
            <Outlet />
          </main>

          <AuthModalHost />
        </div>
      </AuthModalProvider>
    </AuthProvider>
  );
}
