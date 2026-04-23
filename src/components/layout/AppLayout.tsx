import { Outlet } from "react-router";
import { AuthProvider } from "../../context/AuthContext";
import { AuthModalProvider } from "../../context/AuthModalContext";
import { useAuth } from "../../context/AuthContext";
import { AuthModalHost } from "../../features/auth/AuthModalHost";
import { AppLoadingScreen } from "../loading/Loading";
import Footer from "./Footer";
import { Header } from "./Header";

function AppLayoutContent() {
  const { isAuthRestoring } = useAuth();

  if (isAuthRestoring) {
    return <AppLoadingScreen />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-grayscale-100">
      <Header />

      <main className="flex-1  max-mobile:px-2  max-tablet:px-12 max-laptop:px-25 px-44.25">
        <Outlet />
      </main>

      <Footer />
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
