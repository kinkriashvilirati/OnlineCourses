type ConfrimModalProps = {
  onClose: () => void;
  setShowCloseConfirm: (value: boolean) => void;
};

export default function ConfrimModal({
  onClose,
  setShowCloseConfirm,
}: ConfrimModalProps) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center rounded-[20px] bg-grayscale-50/85 px-6 backdrop-blur-[2px]">
      <div className="w-full max-w-92 rounded-2xl border border-grayscale-200 bg-grayscale-50 p-6 shadow-[0_20px_50px_rgba(20,20,20,0.12)]">
        <p className="text-body-m text-grayscale-800">
          Your profile is incomplete. You won&apos;t be able to enroll in
          courses until you complete it. Close anyway?
        </p>

        <div className="mt-5 flex justify-end gap-3">
          <button
            className="button-outline text-button-s"
            onClick={() => setShowCloseConfirm(false)}
            type="button"
          >
            Cancel
          </button>

          <button
            className="button-primary text-button-s"
            onClick={onClose}
            type="button"
          >
            Close anyway
          </button>
        </div>
      </div>
    </div>
  );
}
