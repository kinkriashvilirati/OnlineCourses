import modalCloseIcon from "../../assets/icons/icon-set/modal_close.svg";
type AvatarInputProps = {
  avatarError: string | undefined;
  avatarFileName: string | undefined;
  avatarPreviewUrl: string | null;
  avatarSize: number | null;
  inputId: string;
};

export default function AvatarInput({
  avatarError,
  avatarFileName,
  avatarPreviewUrl,
  avatarSize,
  inputId,
}: AvatarInputProps) {
  return (
    <>
      <label
        className={[
          "flex min-h-35 cursor-pointer flex-col items-center justify-center rounded-xl border border-grayscale-200  bg-grayscale-50 px-4 py-6 text-center transition-colors duration-500 hover:bg-purple-50 hover:border-purple-100 active:bg-purple-100 active:border-purple-200",
          avatarError
            ? "border-helper-error"
            : "border-grayscale-200 hover:border-purple-300",
        ].join(" ")}
        htmlFor={inputId}
      >
        {avatarPreviewUrl ? (
          <>
            <div className="flex gap-1">
              <div>
                <img
                  alt="Avatar preview"
                  className="h-14 w-14 rounded-full object-cover"
                  src={avatarPreviewUrl}
                />
              </div>
              <div className="flex flex-col items-start text-left">
                <p className="mt-3 text-helper-medium text-grayscale-700">
                  {avatarFileName}
                </p>
                {avatarSize && (
                  <p className="text-helper-regular font-light text-grayscale-300">
                    Size -{" "}
                    {avatarSize
                      ? `${(avatarSize / 1024 / 1024).toFixed(2)} MB`
                      : ""}
                  </p>
                )}

                <p className="text-purple-500 text-underline-s text-[10px]">
                  change
                </p>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="">
              <img src={modalCloseIcon} alt="upload image icon" />
            </div>
            <p className="text-body-xs text-grayscale-500 mt-3">
              Drag and drop or{" "}
              <span className="text-underline-s text-purple-500">
                Upload file
              </span>
            </p>
            <p className="text-helper-regular text-gray-400 mt-1.5">
              JPG, PNG or WEBP
            </p>
          </>
        )}
      </label>
    </>
  );
}
