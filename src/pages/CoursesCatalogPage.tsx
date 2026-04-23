import { useMemo, useRef, useState } from "react";
import { ErrorComponent } from "../components/error/Error";
import { LoadingDots } from "../components/loading/Loading";
import Courses from "../features/courses-catalog/courses/Courses";
import Filters from "../features/courses-catalog/filter/Filters";

import CoursesHeaderSort from "../features/courses-catalog/courses/courses-comopnents/CoursesHeaderSort";
import CoursesPagination from "../features/courses-catalog/courses/courses-comopnents/CoursesPagination";
import { useCoursesQuery } from "../hooks/query-hooks/useCoursesQuery";
import { useTopicsQuery } from "../hooks/query-hooks/useTopicsQuery";
import { SORT_OPTIONS, type SortOption } from "../utils/sortOptions";
import PageLocationNav from "../components/shared/PageLocationNav";

const sortOptions = Object.keys(SORT_OPTIONS) as SortOption[];

export function CoursesCatalogPage() {
  const [selectedFilters, setSelectedFilters] = useState({
    categories: [] as number[],
    instructors: [] as number[],
    topics: [] as number[],
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedSort, setSelectedSort] = useState<SortOption>("Newest First");
  const coursesSectionRef = useRef<HTMLElement | null>(null);
  const topicsQuery = useTopicsQuery(selectedFilters.categories);
  const effectiveSelectedFilters = useMemo(() => {
    if (topicsQuery.isPending) {
      return {
        ...selectedFilters,
        topics: [],
      };
    }

    if (!topicsQuery.data) {
      return selectedFilters;
    }

    const validTopicIds = new Set(
      topicsQuery.data.data.map((topic) => topic.id),
    );

    return {
      ...selectedFilters,
      topics: selectedFilters.topics.filter((topicId) =>
        validTopicIds.has(topicId),
      ),
    };
  }, [selectedFilters, topicsQuery.data, topicsQuery.isPending]);
  const coursesQuery = useCoursesQuery({
    page: currentPage,
    categories: effectiveSelectedFilters.categories,
    instructors: effectiveSelectedFilters.instructors,
    topics: effectiveSelectedFilters.topics,
    sort: selectedSort,
  });
  const displayedCount = coursesQuery.data?.data.length ?? 0;
  const totalCount = coursesQuery.data?.meta.total ?? 0;
  const totalPages = coursesQuery.data?.meta.lastPage ?? 1;

  function toggleFilter(
    type: "categories" | "topics" | "instructors",
    id: number,
  ) {
    setCurrentPage(1);
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
    setCurrentPage(1);
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

  function handleSortChange(sortValue: SortOption) {
    setCurrentPage(1);
    setSelectedSort(sortValue);
  }

  return (
    <div className="pt-43">
      <PageLocationNav />
      <div className="flex gap-20 mt-15.5 max-laptopS:flex-col">
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
            onSelectSort={handleSortChange}
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
