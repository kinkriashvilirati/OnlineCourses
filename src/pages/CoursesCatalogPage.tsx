import Filters from "../features/courses-catalog/filter/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export function CoursesCatalogPage() {
  return (
    <div className="pt-43">
      <nav
        aria-label="Breadcrumb"
        className="flex gap-0.5 justify-center max-w-37.25  text-body-m items-center"
      >
        <span className="text-grayscale-500 flex items-center mr-0.5">
          Home
          <FontAwesomeIcon className="max-h-3.25" icon={faChevronRight} />
        </span>

        <span className="text-purple-400">Browse</span>
      </nav>
      <aside>
        <Filters />
      </aside>
      <section>
        {/* articles of the each course */}
        <nav aria-label="Pagination">{/* pagination */}</nav>
      </section>
    </div>
  );
}
