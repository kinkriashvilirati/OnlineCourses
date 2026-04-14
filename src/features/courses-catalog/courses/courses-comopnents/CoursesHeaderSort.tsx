import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import type { SortOption } from "../../../../utils/sortOptions";

type CoursesHeaderSortProps = {
  displayedCount: number;
  onSelectSort: (sortValue: SortOption) => void;
  selectedSort: SortOption;
  sortOptions: readonly SortOption[];
  totalCount: number;
};

export default function CoursesHeaderSort({
  displayedCount,
  onSelectSort,
  selectedSort,
  sortOptions,
  totalCount,
}: CoursesHeaderSortProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleSortSelect(sortValue: SortOption) {
    onSelectSort(sortValue);
    setIsOpen(false);
  }

  return (
    <header
      aria-label="Courses section header"
      className="flex  justify-between gap-6 items-center"
    >
      <p className="flex items-center gap-1.5 text-button-s text-grayscale-400">
        Show {displayedCount} out of {totalCount}
      </p>

      <div className="relative flex flex-col gap-5  ">
        <button
          aria-expanded={isOpen}
          aria-haspopup="listbox"
          className="flex items-center justify-between rounded-[10px] border border-grayscale-100 bg-grayscale-50  px-5 py-3.75  transition-all hover:bg-grayscale-100 hover:border-grayscale-200 duration-300 cursor-pointer gap-1"
          onClick={() => setIsOpen((currentValue) => !currentValue)}
          type="button"
        >
          <span className="flex items-center gap-4">
            <span className="text-body-s font-medium text-grayscale-500">
              Sort By:
            </span>
            <span className="text-body-s font-medium text-purple-500">
              {selectedSort}
            </span>
          </span>
          <FontAwesomeIcon
            className={`text-body-s text-grayscale-500 transition-transform duration-300 ${
              isOpen ? "rotate-180" : ""
            }`}
            icon={faChevronDown}
          />
        </button>

        <div
          className={`absolute z-10 top-full mt-2.5 w-full overflow-hidden rounded-[10px] border border-grayscale-100 bg-grayscale-50 transition-all duration-300  ${
            isOpen
              ? "-translate-y-2 opacity-100"
              : "pointer-events-none -translate-y-20 opacity-0"
          }`}
        >
          <ul className="m-0 list-none p-0" role="listbox">
            {sortOptions.map((sortOption) => {
              const isSelected = sortOption === selectedSort;

              return (
                <li key={sortOption}>
                  <button
                    aria-selected={isSelected}
                    className={`w-full px-4 py-2.5 text-left text-body-s font-medium transition ${
                      isSelected
                        ? "text-purple-500"
                        : "text-grayscale-500 hover:bg-purple-100 hover:text-purple-500"
                    }`}
                    onClick={() => handleSortSelect(sortOption)}
                    role="option"
                    type="button"
                  >
                    {sortOption}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </header>
  );
}
