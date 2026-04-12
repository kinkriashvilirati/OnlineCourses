import { SECTION_INSTRUCTORS } from "./filterData";

type InstructorProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Instructor({
  onToggle,
  selectedIds,
}: InstructorProps) {
  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">{"Instructors"}</p>

      <div className="block">
        {SECTION_INSTRUCTORS.data.map((category) => {
          const isSelected = selectedIds.includes(category.id);

          return (
            <button
              aria-pressed={isSelected}
              className={`button-filter-item text-body-s flex items-center gap-2.5 mb-2 ${
                isSelected ? "choose" : ""
              }`}
              key={`${category.id}-Instructors`}
              onClick={() => onToggle(category.id)}
              type="button"
            >
              {category.avatar && (
                <img src={category.avatar} className="w-7.5 rounded h-7.5" />
              )}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
