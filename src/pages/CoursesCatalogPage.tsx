import { useState } from "react";
import Courses from "../features/courses-catalog/courses/Courses";
import Filters from "../features/courses-catalog/filter/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CoursesHeaderSort from "../features/courses-catalog/courses/courses-comopnents/CoursesHeaderSort";
import { mockData } from "../features/courses-catalog/courses/courses-comopnents/mockData";

const sortOptions = [
  "Newest First",
  "Price: Low to High",
  "Price: High to Low",
  "Most Popular",
  "Title: A-Z",
] as const;
type SortOption = (typeof sortOptions)[number];
export function CoursesCatalogPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as number[],
    instructors: [] as number[],
    topics: [] as number[],
  });
  const [selectedSort, setSelectedSort] = useState<SortOption>("Newest First");
  const courses = mockData.data.slice(0, 9);

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
      <div className="flex gap-20 mt-15.5">
        <aside>
          <Filters
            onClearAll={clearAllFilters}
            onToggleFilter={toggleFilter}
            selectedFilters={selectedFilters}
          />
        </aside>
        <section className="flex flex-col w-full gap-6">
          <CoursesHeaderSort
            displayedCount={courses.length}
            onSelectSort={(sortValue) =>
              setSelectedSort(sortValue as (typeof sortOptions)[number])
            }
            selectedSort={selectedSort}
            sortOptions={sortOptions}
            totalCount={mockData.data.length}
          />
          <Courses courses={courses} />

          {/* pagination */}
          <nav aria-label="pagination"></nav>
        </section>
      </div>
    </div>
  );
}
