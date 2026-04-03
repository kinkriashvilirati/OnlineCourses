import { Outlet } from "react-router";
import { GuestNavigation } from "./GuestNavigation";

export function AppLayout() {
  return (
    <div className="min-h-screen bg-grayscale-100">
      <GuestNavigation />

      <main className="px-44.25 pt-27">
        <Outlet />
      </main>
    </div>
  );
}
