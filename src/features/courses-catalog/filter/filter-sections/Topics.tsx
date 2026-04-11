import { useState } from "react";
import { SECTION_TOPICS } from "./filterData";

export default function Topics() {
  const [selectedTopicIds, setSelectedTopicIds] = useState<number[]>([]);

  function handleTopicToggle(topicId: number) {
    setSelectedTopicIds((currentIds) =>
      currentIds.includes(topicId)
        ? currentIds.filter((id) => id !== topicId)
        : [...currentIds, topicId],
    );
  }

  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">Topics</p>

      <div className="flex flex-wrap gap-2">
        {SECTION_TOPICS.data.map((category) => {
          const isSelected = selectedTopicIds.includes(category.id);

          return (
            <button
              aria-pressed={isSelected}
              className={`button-filter-item text-body-s flex items-center gap-2.5 ${
                isSelected ? "choose" : ""
              }`}
              key={`${category.id}-${category.name}`}
              onClick={() => handleTopicToggle(category.id)}
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
