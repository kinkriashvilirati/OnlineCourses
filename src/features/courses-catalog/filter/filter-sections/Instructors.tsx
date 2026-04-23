import { useState } from "react";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useInstructorsQuery } from "../../../../hooks/query-hooks/useInstructorsQuery";
import {
  FIlterSectionHeader,
  FIlterSectionItemsContainer,
} from "./FilterSectionResponsive";

type InstructorProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Instructor({ onToggle, selectedIds }: InstructorProps) {
  const instructorsQuery = useInstructorsQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 ">
      <FIlterSectionHeader
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Instructors"
      />

      {instructorsQuery.isPending ? <LoadingDots /> : null}

      {instructorsQuery.isError ? <ErrorComponent /> : null}

      {instructorsQuery.data ? (
        <FIlterSectionItemsContainer isOpen={isOpen}>
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
        </FIlterSectionItemsContainer>
      ) : null}
    </div>
  );
}
