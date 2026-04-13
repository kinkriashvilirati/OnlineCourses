import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type CoursesPaginationProps = {
  currentPage: number;
  onPageChange: (page: number) => void;
  totalPages: number;
};

type PaginationItem = number | "ellipsis";

function getPaginationItems(
  currentPage: number,
  totalPages: number,
): PaginationItem[] {
  if (totalPages <= 5) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }

  if (currentPage <= 3) {
    return [1, 2, 3, "ellipsis", totalPages];
  }

  if (currentPage >= totalPages - 2) {
    return [1, "ellipsis", totalPages - 2, totalPages - 1, totalPages];
  }

  return [1, "ellipsis", currentPage, "ellipsis", totalPages];
}

function getPaginationButtonClass(isActive = false) {
  return `button-outline flex h-10 w-10 items-center justify-center rounded-sm border-grayscale-200 border ${
    isActive && "border-purple-500 bg-purple-600 text-grayscale-50"
  }`;
}

export default function CoursesPagination({
  currentPage,
  onPageChange,
  totalPages,
}: CoursesPaginationProps) {
  const resolvedTotalPages = Math.max(totalPages, 1);
  const resolvedCurrentPage = Math.min(
    Math.max(currentPage, 1),
    resolvedTotalPages,
  );
  const paginationItems = getPaginationItems(
    resolvedCurrentPage,
    resolvedTotalPages,
  );
  const isPreviousDisabled = resolvedCurrentPage === 1;
  const isNextDisabled = resolvedCurrentPage === resolvedTotalPages;

  function handlePageChange(page: number) {
    if (page === resolvedCurrentPage) {
      return;
    }

    onPageChange(page);
  }

  return (
    <nav aria-label="Courses pagination" className="mt-4 flex justify-center">
      <ul className=" m-0 flex list-none items-center gap-2 p-0">
        <li>
          <button
            aria-label="Go to previous page"
            className={`${getPaginationButtonClass()} pagination`}
            disabled={isPreviousDisabled}
            onClick={() => handlePageChange(resolvedCurrentPage - 1)}
            type="button"
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
        </li>

        {paginationItems.map((item, index) => {
          if (item === "ellipsis") {
            return (
              <li key={`ellipsis-${index}`}>
                <span
                  aria-hidden="true"
                  className={`${getPaginationButtonClass()} 
                    hover:text-purple-500
                    cursor-auto hover:bg-grayscale-50 `}
                >
                  ...
                </span>
              </li>
            );
          }

          const isActive = item === resolvedCurrentPage;

          return (
            <li key={item}>
              <button
                aria-current={isActive ? "page" : undefined}
                aria-label={`Go to page ${item}`}
                className={getPaginationButtonClass(isActive)}
                onClick={() => handlePageChange(item)}
                type="button"
              >
                {item}
              </button>
            </li>
          );
        })}

        <li>
          <button
            aria-label="Go to next page"
            className={`${getPaginationButtonClass()} pagination`}
            disabled={isNextDisabled}
            onClick={() => handlePageChange(resolvedCurrentPage + 1)}
            type="button"
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </li>
      </ul>
    </nav>
  );
}
