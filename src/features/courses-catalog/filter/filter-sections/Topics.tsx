import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useTopicsQuery } from "../../../../hooks/query-hooks/useTopicsQuery";

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
      <p
        className="text-body-m text-grayscale-500  max-tablet:cursor-pointer max-tablet:hover:text-grayscale-500 duration-300 transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Topics{" "}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`tablet:hidden! transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>
      {topicsQuery.isPending ? <LoadingDots /> : null}
      {topicsQuery.isError ? <ErrorComponent /> : null}
      {topicsQuery.data ? (
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
          </div>
        </div>
      ) : null}
    </div>
  );
}
