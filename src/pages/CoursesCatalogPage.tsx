import Filters from "../features/courses-catalog/filter/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
export function CoursesCatalogPage() {
  return (
    <main>
      <nav aria-label="Breadcrumb">
        <span>Home</span>
        <span>
          <FontAwesomeIcon icon={faChevronRight} />
        </span>
        <span>Browse</span>
      </nav>
      <aside>
        <Filters />
      </aside>
      <section>
        {/* articles of the each course */}
        <nav aria-label="Pagination">{/* pagination */}</nav>
      </section>
    </main>
  );
}
