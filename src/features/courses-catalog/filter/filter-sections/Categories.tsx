import CategoriesIcons from "../../../../assets/icons/filter-categories-icon/CategoriesIcon";

export default function Categories() {
  return (
    <div>
      <button className="button-filter-item text-body-s flex gap-2 choose">
        Development
        {CategoriesIcons.development()}
      </button>
    </div>
  );
}
