export function LoadingDots() {
  return (
    <div className="flex justify-center py-3">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-helper-error animate-bounce [animation-delay:-0.3s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-helper-warning animate-bounce [animation-delay:-0.15s]" />
        <span className="h-1.5 w-1.5 rounded-full bg-helper-success animate-bounce" />
      </div>
    </div>
  );
}

export function AppLoadingScreen() {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center overflow-hidden bg-grayscale-50">
      <div className="relative flex flex-col items-center">
        {/* outer glow */}
        <div className="absolute -inset-10 rounded-full bg-purple-500/20 blur-3xl animate-pulse" />

        {/* spinning rings */}
        <div className="relative flex h-32 w-32 items-center justify-center">
          <div className="absolute h-32 w-32 rounded-full border-4 border-grayscale-300 border-t-purple-500 animate-spin" />

          {/* center core */}
          <p className="text-[14px] font-extrabold tracking-[0.35em] uppercase text-grayscale-900 animate-pulse">
            Loading
          </p>
        </div>
      </div>
    </div>
  );
}
