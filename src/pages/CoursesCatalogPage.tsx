import { useState } from "react";
import Filters from "../features/courses-catalog/filter/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";

export function CoursesCatalogPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as number[],
    instructors: [] as number[],
    topics: [] as number[],
  });

  function toggleFilter(
    type: "categories" | "topics" | "instructors",
    id: number,
  ) {
    setSelectedFilters((prevFilters) => {
      const currentFilters = prevFilters[type];
      const updatedFilters = currentFilters.includes(id)
        ? currentFilters.filter((filterId) => filterId !== id)
        : [...currentFilters, id];

      return {
        ...prevFilters,
        [type]: updatedFilters,
      };
    });
  }

  function clearAllFilters() {
    setSelectedFilters({
      categories: [],
      instructors: [],
      topics: [],
    });
  }

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
        <Filters
          onClearAll={clearAllFilters}
          onToggleFilter={toggleFilter}
          selectedFilters={selectedFilters}
        />
      </aside>
      <section>
        {/* sorting */}
        <div></div>

        {/* courses */}
        <ul>
          {/* <li>
            <article></article>
          </li> */}
        </ul>

        {/* pagination */}
        <nav aria-label="pagination"></nav>
      </section>
    </div>
  );
}
