import { useState } from "react";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useTopicsQuery } from "../../../../hooks/query-hooks/useTopicsQuery";
import {
  FIlterSectionHeader,
  FIlterSectionItemsContainer,
} from "./FilterSectionResponsive";

type TopicsProps = {
  onToggle: (id: number) => void;
  selectedCategoryIds: number[];
  selectedIds: number[];
};

export default function Topics({
  onToggle,
  selectedCategoryIds,
  selectedIds,
}: TopicsProps) {
  const topicsQuery = useTopicsQuery(selectedCategoryIds);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex flex-col gap-6 ">
      {" "}
      <FIlterSectionHeader
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="Topics"
      />
      {topicsQuery.isPending ? <LoadingDots /> : null}
      {topicsQuery.isError ? <ErrorComponent /> : null}
      {topicsQuery.data ? (
        <FIlterSectionItemsContainer isOpen={isOpen}>
          <div className="flex flex-wrap gap-2">
            {topicsQuery.data.data.map((topic) => {
              const isSelected = selectedIds.includes(topic.id);

              return (
                <button
                  aria-pressed={isSelected}
                  className={`button-filter-item text-body-s  max-laptopS:text-[13px] flex items-center gap-2.5 ${
                    isSelected ? "choose" : ""
                  }`}
                  key={`${topic.id}-topics`}
                  onClick={() => onToggle(topic.id)}
                  type="button"
                >
                  <span>{topic.name}</span>
                </button>
              );
            })}
          </div>
        </FIlterSectionItemsContainer>
      ) : null}
    </div>
  );
}
