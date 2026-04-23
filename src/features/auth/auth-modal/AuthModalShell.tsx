import type { PropsWithChildren, ReactNode } from "react";
import modalCloseIcon from "../../../assets/icons/icon-set/modal_close.svg";
import registerBackStep from "../../../assets/icons/icon-set/register_back.svg";

type AuthModalShellProps = PropsWithChildren<{
  backAriaLabel?: string;
  closeAriaLabel: string;
  description?: string;
  headerSlot?: ReactNode;
  isOpen: boolean;
  onBack?: () => void;
  onClose: () => void;
  onOverlayClick?: () => void;
  panelClassName?: string;
  title: string;
}>;

export function AuthModalShell({
  backAriaLabel = "Go back",
  children,
  closeAriaLabel,
  description,
  headerSlot,
  isOpen,
  onBack,
  onClose,
  onOverlayClick,
  panelClassName,
  title,
}: AuthModalShellProps) {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center ">
      <button
        aria-label={closeAriaLabel}
        className="absolute inset-0 bg-grayscale-950/45 backdrop-blur-[3px]"
        onClick={onOverlayClick ?? onClose}
        type="button"
      />

      <section
        aria-modal="true"
        className={[
          " relative z-10 w-full rounded-[20px] bg-grayscale-50 shadow-[0_30px_80px_rgba(20,20,20,0.22)]",
          panelClassName ?? panelClassName,
        ].join(" ")}
        role="dialog"
      >
        {onBack ? (
          <button
            aria-label={backAriaLabel}
            className="absolute left-6 top-6 cursor-pointer"
            onClick={onBack}
            type="button"
          >
            <img alt="" className="max-w-6" src={registerBackStep} />
          </button>
        ) : null}

        <button
          aria-label={closeAriaLabel}
          className="absolute right-6 top-6 cursor-pointer"
          onClick={onClose}
          type="button"
        >
          <img alt="" className="max-w-6" src={modalCloseIcon} />
        </button>

        <div className="mt-1 text-center">
          <h2 className="text-h2">{title}</h2>
          {description ? (
            <p className="text-body-xs text-grayscale-500">{description}</p>
          ) : null}
        </div>

        {headerSlot}

        {children}
      </section>
    </div>
  );
}
