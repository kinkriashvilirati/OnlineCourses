import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useInstructorsQuery } from "../../../../hooks/query-hooks/useInstructorsQuery";

type InstructorProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Instructor({ onToggle, selectedIds }: InstructorProps) {
  const instructorsQuery = useInstructorsQuery();

  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">{"Instructors"}</p>

      {instructorsQuery.isPending ? <LoadingDots /> : null}

      {instructorsQuery.isError ? <ErrorComponent /> : null}

      {instructorsQuery.data ? (
        <div className="block">
          {instructorsQuery.data.data.map((instructor) => {
            const isSelected = selectedIds.includes(instructor.id);

            return (
              <button
                aria-pressed={isSelected}
                className={`button-filter-item text-body-s flex items-center gap-2.5 mb-2 ${
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
      ) : null}
    </div>
  );
}
