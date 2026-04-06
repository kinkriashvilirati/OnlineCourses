import { Outlet } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { AuthModalProvider } from "../../context/AuthModalContext";
import { useAuth } from "../../context/AuthContext";
import { AuthModalHost } from "../../features/auth/AuthModalHost";
import { AppLoadingScreen } from "../loading/Loading";
import { Header } from "./Header";

function AppLayoutContent() {
  const { isAuthRestoring } = useAuth();

  if (isAuthRestoring) {
    return <AppLoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-grayscale-100 ">
      <Header />

      <main className="px-44.25 pt-27 mb-1000">
        <Outlet />
      </main>

      <AuthModalHost />
    </div>
  );
}

export function AppLayout() {
  return (
    <AuthProvider>
      <AuthModalProvider>
        <AppLayoutContent />
      </AuthModalProvider>
    </AuthProvider>
  );
}
