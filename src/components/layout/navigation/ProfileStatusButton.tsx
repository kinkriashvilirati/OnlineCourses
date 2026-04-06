type ProfileStatusButtonProps = {
  isProfileComplete: boolean;
};

function ProfileStatusIndicator({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  if (isProfileComplete) {
    return (
      <span className="absolute right-0 bottom-0 h-3.75 w-3.75  flexitems-center justify-center rounded-full border-2 border-grayscale-100 bg-helper-success text-grayscale-50"></span>
    );
  }

  return (
    <span className="absolute right-0 bottom-0  h-3.75 w-3.75 rounded-full border-2 border-grayscale-100 bg-helper-warning" />
  );
}

export default function ProfileStatusButton({
  isProfileComplete,
}: ProfileStatusButtonProps) {
  return (
    <button
      aria-label="Open profile"
      className="relative flex h-15 w-15 items-center justify-center rounded-full bg-purple-50 text-purple-400 transition-colors duration-200 border border-purple-50 hover:border-purple-200 cursor-pointer"
      type="button"
    >
      <svg
        width="38"
        height="38"
        viewBox="0 0 38 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M30.0833 33.25V30.0833C30.0833 28.4036 29.416 26.7927 28.2283 25.605C27.0406 24.4173 25.4297 23.75 23.75 23.75H14.25C12.5703 23.75 10.9593 24.4173 9.77162 25.605C8.58389 26.7927 7.91663 28.4036 7.91663 30.0833V33.25"
          stroke="#736BEA"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          strokeWidth="2.5"
        />
        <path
          d="M19 17.4167C22.4978 17.4167 25.3333 14.5811 25.3333 11.0833C25.3333 7.58553 22.4978 4.75 19 4.75C15.5022 4.75 12.6666 7.58553 12.6666 11.0833C12.6666 14.5811 15.5022 17.4167 19 17.4167Z"
          stroke="#736BEA"
          strokeWidth="2.5"
          stroke-width="2.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>

      <ProfileStatusIndicator isProfileComplete={isProfileComplete} />
    </button>
  );
}
