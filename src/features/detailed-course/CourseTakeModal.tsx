import type { ReactNode } from "react";
import GetModdelacons from "../../assets/icons/modalIcons/GetModellacons";
import { useAuthModalLifecycle } from "../../hooks/useAuthModalLifecycle";

type CourseTakeModalProps = {
  actions: ReactNode;
  children?: ReactNode;
  description: ReactNode;
  icon: keyof typeof GetModdelacons;
  isOpen: boolean;
  onClose: () => void;
  title: string;
};

export default function CourseTakeModal({
  actions,
  children,
  description,
  icon,
  isOpen,
  onClose,
  title,
}: CourseTakeModalProps) {
  useAuthModalLifecycle(isOpen, onClose);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center px-4">
      <button
        aria-label="Close course modal"
        className="absolute inset-0 bg-grayscale-950/45 backdrop-blur-[3px]"
        onClick={onClose}
        type="button"
      />

      <section
        aria-modal="true"
        className="relative z-10 flex w-full max-w-122.5 flex-col items-center gap-8 rounded-[24px] bg-grayscale-50 px-12 py-10 text-center shadow-[0_30px_80px_rgba(20,20,20,0.22)]"
        role="dialog"
      >
        <img alt="" className="h-18 w-18 shrink-0" src={GetModdelacons[icon]} />

        <div className="flex flex-col gap-4">
          <h2 className="text-h2 text-grayscale-800">{title}</h2>
          <div className="text-body-s text-grayscale-700">{description}</div>
        </div>

        {children ? <div className="w-full">{children}</div> : null}

        <div className="flex w-full flex-col gap-4 sm:flex-row">{actions}</div>
      </section>
    </div>
  );
}
