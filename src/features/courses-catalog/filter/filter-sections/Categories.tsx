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

  return (
    <div className="flex flex-col gap-6 ">
      <p className="text-body-m text-grayscale-500">Categories</p>

      {categoriesQuery.isPending ? <LoadingDots /> : null}

      {categoriesQuery.isError ? <ErrorComponent /> : null}

      {categoriesQuery.data ? (
        <div className="flex flex-wrap gap-2">
          {categoriesQuery.data.data.map((category) => {
            const Icon =
              category.icon &&
              CategoriesIcons[category.icon.toLocaleLowerCase()];
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
      ) : null}
    </div>
  );
}
