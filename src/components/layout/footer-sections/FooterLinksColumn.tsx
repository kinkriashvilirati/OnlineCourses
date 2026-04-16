import { Link } from "react-router";
import { useAuthModal } from "../../../context/AuthModalContext";

type FooterLinksColumnProps = {
  title: string;
};

export function FooterLinksColumn({ title }: FooterLinksColumnProps) {
  const { setIsPanelOpen } = useAuthModal();
  return (
    <div className="flex  flex-col gap-4">
      <h4 className="text-h4 text-purple-800">{title}</h4>
      <div className=" flex flex-col gap-2">
        {title === "Explore" ? (
          <>
            <Link
              className="text-body-m text-grayscale-500 transition-colors duration-200 hover:text-purple-500"
              to="/courses"
            >
              Brows Courses
            </Link>
            <button
              className="text-body-m text-grayscale-500 transition-colors duration-200 hover:text-purple-500"
              onClick={() => {
                setIsPanelOpen((prev) => !prev);
              }}
            >
              Brows Courses
            </button>
          </>
        ) : (
          <Link
            className="text-body-m text-grayscale-500 transition-colors duration-200 hover:text-purple-500"
            to="/"
          >
            Profile
          </Link>
        )}
      </div>
    </div>
  );
}
