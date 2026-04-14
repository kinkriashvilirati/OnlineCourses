import { useMemo, useRef, useState } from "react";
import { ErrorComponent } from "../components/error/Error";
import { LoadingDots } from "../components/loading/Loading";
import Courses from "../features/courses-catalog/courses/Courses";
import Filters from "../features/courses-catalog/filter/Filters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import CoursesHeaderSort from "../features/courses-catalog/courses/courses-comopnents/CoursesHeaderSort";
import CoursesPagination from "../features/courses-catalog/courses/courses-comopnents/CoursesPagination";
import { useCoursesQuery } from "../hooks/query-hooks/useCoursesQuery";
import { useTopicsQuery } from "../hooks/query-hooks/useTopicsQuery";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<SortOption>("Newest First");
  const coursesSectionRef = useRef<HTMLElement | null>(null);
  const coursesQuery = useCoursesQuery(currentPage);
  const topicsQuery = useTopicsQuery(selectedFilters.categories);
  const displayedCount = coursesQuery.data?.data.length ?? 0;
  const totalCount = coursesQuery.data?.meta.total ?? 0;
  const totalPages = coursesQuery.data?.meta.lastPage ?? 1;
  const effectiveSelectedFilters = useMemo(() => {
    if (!topicsQuery.data) {
      return selectedFilters;
    }

    const validTopicIds = new Set(topicsQuery.data.data.map((topic) => topic.id));

    return {
      ...selectedFilters,
      topics: selectedFilters.topics.filter((topicId) =>
        validTopicIds.has(topicId),
      ),
    };
  }, [selectedFilters, topicsQuery.data]);

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

  function handlePageChange(page: number) {
    setCurrentPage(page);
    coursesSectionRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
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
            selectedFilters={effectiveSelectedFilters}
          />
        </aside>
        <section className="flex flex-col w-full gap-6" ref={coursesSectionRef}>
          <CoursesHeaderSort
            displayedCount={displayedCount}
            onSelectSort={(sortValue) =>
              setSelectedSort(sortValue as (typeof sortOptions)[number])
            }
            selectedSort={selectedSort}
            sortOptions={sortOptions}
            totalCount={totalCount}
          />

          {coursesQuery.isPending ? <LoadingDots /> : null}
          {coursesQuery.isError ? <ErrorComponent /> : null}
          {coursesQuery.data ? (
            <Courses courses={coursesQuery.data.data} />
          ) : null}

          {coursesQuery.data ? (
            <CoursesPagination
              currentPage={currentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          ) : null}
        </section>
      </div>
    </div>
  );
}
