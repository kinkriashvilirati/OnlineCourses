import { useState } from "react";
import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import { ErrorComponent } from "../../../../components/error/Error";
import { LoadingDots } from "../../../../components/loading/Loading";
import { useCategoriesQuery } from "../../../../hooks/query-hooks/useCategoriesQuery";
import {
  FIlterSectionHeader,
  FIlterSectionItemsContainer,
} from "./FilterSectionResponsive";

type CategoriesProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Categories({ onToggle, selectedIds }: CategoriesProps) {
  const categoriesQuery = useCategoriesQuery();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col gap-6 ">
      <FIlterSectionHeader
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        title="Categories"
      />

      {categoriesQuery.isPending ? <LoadingDots /> : null}

      {categoriesQuery.isError ? <ErrorComponent /> : null}

      {categoriesQuery.data ? (
        <FIlterSectionItemsContainer isOpen={isOpen}>
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
        </FIlterSectionItemsContainer>
      ) : null}
    </div>
  );
}
