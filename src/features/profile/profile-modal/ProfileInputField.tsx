import type { InputHTMLAttributes, ReactNode } from "react";

type ProfileInputFieldProps = {
  defaultValue?: string;
  disabled?: boolean;
  label: string;
  placeholder?: string;
  prefix?: string;
  rightAdornment?: ReactNode;
} & Pick<
  InputHTMLAttributes<HTMLInputElement>,
  "inputMode" | "readOnly" | "type"
>;

export function ProfileInputField({
  defaultValue,
  disabled = false,
  inputMode,
  label,
  placeholder,
  prefix,
  readOnly = false,
  rightAdornment,
  type = "text",
}: ProfileInputFieldProps) {
  return (
    <div>
      <label className="mb-3 block text-body-xl text-grayscale-700">
        {label}
      </label>

      <div className="relative">
        {prefix ? (
          <span className="pointer-events-none  absolute left-4 top-1/2 -translate-y-1/2 text-body-m text-grayscale-300">
            {prefix}
          </span>
        ) : null}

        <input
          className={[
            "h-18 w-full rounded-[20px] border-[1.5px] border-grayscale-200 bg-grayscale-50 px-4 text-body-m text-grayscale-700 outline-none transition-colors duration-300 placeholder:text-grayscale-300 hover:border-grayscale-300 focus:border-grayscale-400",
            prefix ? "pl-22" : "",
            rightAdornment ? "pr-14" : "",
            disabled
              ? "cursor-not-allowed text-grayscale-300 hover:border-grayscale-200 focus:border-grayscale-200"
              : "",
          ].join(" ")}
          defaultValue={defaultValue}
          disabled={disabled}
          inputMode={inputMode}
          placeholder={placeholder}
          readOnly={readOnly}
          type={type}
        />

        {rightAdornment ? (
          <span className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2">
            {rightAdornment}
          </span>
        ) : null}
      </div>
    </div>
  );
}
