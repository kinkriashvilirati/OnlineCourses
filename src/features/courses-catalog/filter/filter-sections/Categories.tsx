import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";
import { SECTION_CATEGORIES } from "./filterData";

type CategoriesProps = {
  onToggle: (id: number) => void;
  selectedIds: number[];
};

export default function Categories({
  onToggle,
  selectedIds,
}: CategoriesProps) {
  const data = SECTION_CATEGORIES.data;

  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">Categories</p>

      <div className="flex flex-wrap gap-2">
        {data.map((category) => {
          const Icon =
            category.icon && CategoriesIcons[category.icon.toLocaleLowerCase()];
          const isSelected = selectedIds.includes(category.id);

          return (
            <button
              aria-pressed={isSelected}
              className={`button-filter-item text-body-s flex items-center gap-2.5 ${
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
