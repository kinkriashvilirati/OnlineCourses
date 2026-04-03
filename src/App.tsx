import { GuestNavigation } from "./components/layout/GuestNavigation";

function App() {
  return (
    <div className="min-h-screen bg-grayscale-100">
      <GuestNavigation />
      <main className="px-[177px] pt-[97px]">
        <div className="h-[calc(100vh-97px)]" />
      </main>
    </div>
  );
}

export default App;
