import { SECTION_TOPICS } from "./filterData";

type TopicsProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Topics({ onToggle, selectedIds }: TopicsProps) {
  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">Topics</p>

      <div className="flex flex-wrap gap-2">
        {SECTION_TOPICS.data.map((category) => {
          const isSelected = selectedIds.includes(category.id);

          return (
            <button
              aria-pressed={isSelected}
              className={`button-filter-item text-body-s flex items-center gap-2.5 ${
                isSelected ? "choose" : ""
              }`}
              key={`${category.id}-topics`}
              onClick={() => onToggle(category.id)}
              type="button"
            >
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
