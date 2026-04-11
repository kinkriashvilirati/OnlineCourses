import { useState } from "react";
import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import { SECTION_CATEGORIES } from "./filterData";

export default function Categories() {
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);

  function handleCategoryToggle(categoryId: number) {
    setSelectedCategoryIds((currentIds) =>
      currentIds.includes(categoryId)
        ? currentIds.filter((id) => id !== categoryId)
        : [...currentIds, categoryId],
    );
    console.log(selectedCategoryIds);
  }
  const title = "Categories";
  const data = SECTION_CATEGORIES.data;
  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">{title}</p>

      <div className="flex flex-wrap gap-2">
        {data.map((category) => {
          const Icon =
            category.icon && CategoriesIcons[category.icon.toLocaleLowerCase()];
          const isSelected = selectedCategoryIds.includes(category.id);

          return (
            <button
              aria-pressed={isSelected}
              className={`button-filter-item text-body-s flex items-center gap-2.5 ${
                isSelected ? "choose" : ""
              }`}
              key={`${category.id}-${category.name}`}
              onClick={() => handleCategoryToggle(category.id)}
              type="button"
            >
              {Icon ? (
                <Icon />
              ) : (
                category.icon && (
                  <img src={category.icon} className="w-7.5 rounded h-7.5" />
                )
              )}
              <span>{category.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
