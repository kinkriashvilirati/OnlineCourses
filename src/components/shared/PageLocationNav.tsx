import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router";
type PageLocatiionNavParam = {
  coursePage?: string | null;
};
export default function PageLocationNav({
  coursePage = null,
}: PageLocatiionNavParam) {
  const notCurrentPageStyle =
    "hover:text-purple-400 text-grayscale-500 flex items-center mr-0.5 cursor-pointer transition-all duration-300";
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex  justify-start   text-body-m items-center"
    >
      <div className="flex gap-0.5 items-center justify-center px-1">
        <Link to="/" className={notCurrentPageStyle}>
          Home
          <FontAwesomeIcon className="max-h-3.25" icon={faChevronRight} />
        </Link>
        {coursePage ? (
          <>
            <Link to="/courses" className={notCurrentPageStyle}>
              Browse
              <FontAwesomeIcon className="max-h-3.25" icon={faChevronRight} />
            </Link>
            <span className="text-purple-400">{coursePage}</span>
          </>
        ) : (
          <span className="text-purple-400">Browse</span>
        )}
      </div>
    </nav>
  );
}
