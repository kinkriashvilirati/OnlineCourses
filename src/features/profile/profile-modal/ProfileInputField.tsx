import type { InputHTMLAttributes, ReactNode } from "react";

type ProfileInputFieldProps = {
  disabled?: boolean;
  error?: string;
  isValid?: boolean;
  label: string;
  onBlur?: () => void;
  onChange?: (value: string) => void;
  placeholder?: string;
  prefix?: string;
  rightAdornment?: ReactNode;
  value: string;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "inputMode" | "readOnly" | "type"
>;

export function ProfileInputField({
  disabled = false,
  error,
  inputMode,
  isValid = false,
  label,
  onBlur,
  onChange,
  placeholder,
  prefix,
  readOnly = false,
  rightAdornment,
  type = "text",
  value,
}: ProfileInputFieldProps) {
  return (
    <div className="relative">
      <label
        className={`mb-2 block text-body-m text-grayscale-700 ${error ? "text-helper-error" : ""}`}
      >
        {label}
      </label>

      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-body-s text-grayscale-300">
            {prefix}
          </span>
        ) : null}

        <input
          className={[
            "h-12 max-laptop:h-11 w-full rounded-lg border-[1.5px] border-grayscale-200 bg-grayscale-50 px-4 text-body-xs text-grayscale-700 outline-none transition-colors duration-300 placeholder:text-grayscale-300 hover:border-grayscale-300 focus:border-grayscale-400",
            prefix ? "pl-18" : "",
            rightAdornment ? "pr-11" : "",
            error
              ? "border-helper-error focus:border-helper-error"
              : isValid
                ? "border-helper-success focus:border-helper-success"
                : "",
            disabled
              ? "cursor-not-allowed text-grayscale-300 hover:border-grayscale-200 focus:border-grayscale-200"
              : "",
          ].join(" ")}
          disabled={disabled}
          inputMode={inputMode}
          onBlur={onBlur}
          onChange={(event) => onChange?.(event.target.value)}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
          value={value}
        />

        {rightAdornment ? (
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2">
            {rightAdornment}
          </span>
        ) : null}
      </div>

      {error ? (
        <span className="text-helper-regular text-helper-error absolute max-w-full">
          {error}
        </span>
      ) : (
        <></>
      )}
    </div>
  );
}
