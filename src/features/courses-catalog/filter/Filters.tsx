import { faX } from "@fortawesome/free-solid-svg-icons";
import Categories from "./filter-sections/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Instructor from "./filter-sections/Instructors";
import Topics from "./filter-sections/Topics";

type FiltersProps = {
  onClearAll: () => void;
  onToggleFilter: (
    type: "categories" | "topics" | "instructors",
    id: number,
  ) => void;
  selectedFilters: {
    categories: number[];
    instructors: number[];
    topics: number[];
  };
};

export default function Filters({
  onClearAll,
  onToggleFilter,
  selectedFilters,
}: FiltersProps) {
  const totalActive =
    selectedFilters.categories.length +
    selectedFilters.topics.length +
    selectedFilters.instructors.length;

  return (
    <aside className="flex w-full min-w-77.25 flex-col   gap-6">
      <header className="flex items-center justify-between ">
        <h1 className="text-h1 text-grayscale-950">Filters</h1>
        <button
          className="flex items-center gap-1.5 text-button-s text-grayscale-400 transition hover:text-purple-600 cursor-pointer"
          onClick={onClearAll}
          type="button"
        >
          Clear All Filters <FontAwesomeIcon icon={faX} />
        </button>
      </header>

      <div className="flex flex-col gap-14 max-w-77.25">
        <section>
          <Categories
            onToggle={(id) => onToggleFilter("categories", id)}
            selectedIds={selectedFilters.categories}
          />
        </section>
        <section>
          <Topics
            onToggle={(id) => onToggleFilter("topics", id)}
            selectedIds={selectedFilters.topics}
          />
        </section>
        <section>
          <Instructor
            onToggle={(id) => onToggleFilter("instructors", id)}
            selectedIds={selectedFilters.instructors}
          />
        </section>
      </div>

      <footer className="mt-6 border-t border-grayscale-200 pt-5">
        <p className="text-body-s text-grayscale-500">
          {totalActive} Filters Active
        </p>
      </footer>
    </aside>
  );
}
