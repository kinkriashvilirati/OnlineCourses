import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useInstructorsQuery } from "../../../../hooks/query-hooks/useInstructorsQuery";

type InstructorProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Instructor({ onToggle, selectedIds }: InstructorProps) {
  const instructorsQuery = useInstructorsQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 ">
      <p
        className="text-body-m text-grayscale-500  max-tablet:cursor-pointer max-tablet:hover:text-grayscale-500 duration-300 transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Instructors{" "}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`tablet:hidden! transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>

      {instructorsQuery.isPending ? <LoadingDots /> : null}

      {instructorsQuery.isError ? <ErrorComponent /> : null}

      {instructorsQuery.data ? (
        <div
          className={`
    tablet:grid-rows-[1fr] tablet:opacity-100
    max-tablet:grid max-tablet:transition-[grid-template-rows,opacity] max-tablet:duration-300 max-tablet:ease-in-out
    ${
      isOpen
        ? "max-tablet:grid-rows-[1fr] max-tablet:opacity-100"
        : "max-tablet:grid-rows-[0fr] max-tablet:opacity-0"
    }
  `}
        >
          <div className="overflow-hidden">
            <div className="flex flex-wrap gap-2 laptopS:block">
              {instructorsQuery.data.data.map((instructor) => {
                const isSelected = selectedIds.includes(instructor.id);

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`button-filter-item text-body-s  max-laptopS:text-[13px] flex items-center gap-2.5 mb-2 ${
                      isSelected ? "choose" : ""
                    }`}
                    key={`${instructor.id}-Instructors`}
                    onClick={() => onToggle(instructor.id)}
                    type="button"
                  >
                    {instructor.avatar ? (
                      <img
                        alt={instructor.name}
                        className="w-7.5 rounded h-7.5"
                        src={instructor.avatar}
                      />
                    ) : (
                      <div className="h-7.5 w-7.5 rounded-full bg-grayscale-200" />
                    )}
                    <span>{instructor.name}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
