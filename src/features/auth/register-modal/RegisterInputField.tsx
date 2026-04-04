import { useState } from "react";
import eyeClosed from "../../../assets/icons/icon-set/eye_closed.svg";
import eyeOpen from "../../../assets/icons/icon-set/eye_open.svg";

type RegisterInputFieldProps = {
  allowPasswordToggle?: boolean;
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "email" | "password" | "text";
  value: string;
};

export function RegisterInputField({
  allowPasswordToggle = false,
  error,
  id,
  label,
  onChange,
  placeholder,
  type,
  value,
}: RegisterInputFieldProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const isPasswordField = type === "password";
  const inputType =
    isPasswordField && isPasswordVisible ? "text" : type;

  return (
    <div>
      <label
        className="mb-2 block text-helper-medium text-grayscale-700"
        htmlFor={id}
      >
        {label}
      </label>
      <div className="relative">
        <input
          className={[
            "duration-300 h-12 w-full rounded-lg border-[1.5px] bg-grayscale-50 px-4 text-body-xs text-grayscale-700 outline-none transition-colors placeholder:text-grayscale-400 hover:border-grayscale-300 hover:placeholder:text-grayscale-200",
            allowPasswordToggle && isPasswordField ? "pr-12" : "",
            error
              ? "border-helper-error focus:border-helper-error"
              : "border-grayscale-200 focus:border-grayscale-400",
          ].join(" ")}
          id={id}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          type={inputType}
          value={value}
        />

        {allowPasswordToggle && isPasswordField ? (
          <button
            aria-label={
              isPasswordVisible ? "Hide password" : "Show password"
            }
            className="absolute right-4 top-1/2 flex -translate-y-1/2 cursor-pointer items-center justify-center"
            onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
            type="button"
          >
            <img
              alt=""
              className="h-5 w-5 object-contain"
              src={isPasswordVisible ? eyeOpen : eyeClosed}
            />
          </button>
        ) : null}
      </div>
      {error ? (
        <p className="mt-2 text-helper-regular text-helper-error">{error}</p>
      ) : null}
    </div>
  );
}
