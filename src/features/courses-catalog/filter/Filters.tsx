import { faX, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import Categories from "./filter-sections/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Instructor from "./filter-sections/Instructors";
import Topics from "./filter-sections/Topics";
import { useState } from "react";

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
  const [isOpen, setIsOpen] = useState(false);

  const totalActive =
    selectedFilters.categories.length +
    selectedFilters.topics.length +
    selectedFilters.instructors.length;

  return (
    <aside className="flex w-full min-w-77.25 flex-col gap-6 ">
      <header className="flex items-center justify-between">
        <h1
          className="text-h1 text-grayscale-900 laptopS:cursor-default max-laptopS:flex max-laptopS:cursor-pointer max-laptopS:items-center max-laptopS:gap-2 max-laptopS:text-grayscale-700 max-laptopS:hover:text-grayscale-950 duration-300 transition-all
          "
          onClick={() => setIsOpen((prev) => !prev)}
        >
          Filters
          <FontAwesomeIcon
            icon={faChevronDown}
            className={`laptopS:hidden! transition-transform duration-300 ease-in-out ${
              isOpen ? "rotate-180" : "rotate-0"
            }`}
          />
        </h1>

        <button
          className="flex items-center gap-1.5 text-button-s text-grayscale-400 transition hover:text-purple-600 cursor-pointer"
          onClick={onClearAll}
          type="button"
        >
          Clear All Filters <FontAwesomeIcon icon={faX} />
        </button>
      </header>

      <div
        className={`
          laptopS:grid-rows-[1fr] laptopS:opacity-100
          max-laptopS:grid max-laptopS:transition-[grid-template-rows,opacity] max-laptopS:duration-300 max-laptopS:ease-in-out
          ${
            isOpen
              ? "max-laptopS:grid-rows-[1fr] max-laptopS:opacity-100"
              : "max-laptopS:grid-rows-[0fr] max-laptopS:opacity-0"
          }
        `}
      >
        <div className="overflow-hidden">
          <div className="flex laptopS:flex-col gap-14 max-tablet:gap-3 max-w-77.25 max-laptopS:grid max-laptopS:max-w-full max-laptopS:grid-cols-[1fr_2fr_2fr] max-tablet:grid-cols-1">
            <section className="w-full min-w-0">
              <Categories
                onToggle={(id) => onToggleFilter("categories", id)}
                selectedIds={selectedFilters.categories}
              />
            </section>

            <section className="w-full min-w-0">
              <Topics
                onToggle={(id) => onToggleFilter("topics", id)}
                selectedCategoryIds={selectedFilters.categories}
                selectedIds={selectedFilters.topics}
              />
            </section>

            <section className="w-full">
              <Instructor
                onToggle={(id) => onToggleFilter("instructors", id)}
                selectedIds={selectedFilters.instructors}
              />
            </section>
          </div>
        </div>
      </div>

      <footer className=" border-t border-grayscale-200 pt-5 ">
        <p className="text-body-s text-grayscale-500">
          {totalActive} Filters Active
        </p>
      </footer>
    </aside>
  );
}
