type RegisterInputFieldProps = {
  error?: string;
  id: string;
  label: string;
  onChange: (value: string) => void;
  placeholder: string;
  type: "email" | "password" | "text";
  value: string;
};

export function RegisterInputField({
  error,
  id,
  label,
  onChange,
  placeholder,
  type,
  value,
}: RegisterInputFieldProps) {
  return (
    <div>
      <label
        className="mb-2 block text-helper-medium text-grayscale-700"
        htmlFor={id}
      >
        {label}
      </label>
      <input
        className={[
          "duration-300 h-12 w-full rounded-lg border-[1.5px] bg-grayscale-50 px-4 text-body-xs text-grayscale-700 outline-none transition-colors placeholder:text-grayscale-400 hover:border-grayscale-300 hover:placeholder:text-grayscale-200",
          error
            ? "border-helper-error focus:border-helper-error"
            : "border-grayscale-200 focus:border-grayscale-400",
        ].join(" ")}
        id={id}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type={type}
        value={value}
      />
      {error ? (
        <p className="mt-2 text-helper-regular text-helper-error">{error}</p>
      ) : null}
    </div>
  );
}
