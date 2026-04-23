import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useCategoriesQuery } from "../../../../hooks/query-hooks/useCategoriesQuery";

type CategoriesProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Categories({ onToggle, selectedIds }: CategoriesProps) {
  const categoriesQuery = useCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 ">
      <p
        className="text-body-m text-grayscale-500  max-tablet:cursor-pointer max-tablet:hover:text-grayscale-500 duration-300 transition-all"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        Categories{" "}
        <FontAwesomeIcon
          icon={faChevronDown}
          className={`tablet:hidden! transition-transform duration-300 ease-in-out ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </p>

      {categoriesQuery.isPending ? <LoadingDots /> : null}

      {categoriesQuery.isError ? <ErrorComponent /> : null}

      {categoriesQuery.data ? (
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
              {categoriesQuery.data.data.map((category) => {
                const Icon =
                  category.icon &&
                  CategoriesIcons[category.icon.toLocaleLowerCase()];
                const isSelected = selectedIds.includes(category.id);

                return (
                  <button
                    aria-pressed={isSelected}
                    className={`button-filter-item text-body-s  max-laptopS:text-[13px] flex items-center gap-2.5 ${
                      isSelected ? "choose" : ""
                    }`}
                    key={`${category.id}-Categories`}
                    onClick={() => onToggle(category.id)}
                    type="button"
                  >
                    {Icon ? (
                      <Icon />
                    ) : (
                      category.icon && (
                        <img
                          alt=""
                          className="w-7.5 rounded h-7.5"
                          src={category.icon}
                        />
                      )
                    )}
                    <span>{category.name}</span>
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
