import { faX } from "@fortawesome/free-solid-svg-icons";
import Categories from "./filter-sections/Categories";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Instructor from "./filter-sections/Instructors";
import Topics from "./filter-sections/Topics";

export default function Filters() {
  return (
    <aside className="flex w-full max-w-77.25 flex-col  mt-15.5 gap-6">
      <header className="flex items-center justify-between ">
        <h1 className="text-h1 text-grayscale-950">Filters</h1>
        <button
          className="flex items-center gap-1.5 text-button-s text-grayscale-400 transition hover:text-purple-600 cursor-pointer"
          type="button"
        >
          Clear All Filters <FontAwesomeIcon icon={faX} />
        </button>
      </header>

      <div className="flex flex-col gap-14">
        <section>
          <Categories />
        </section>
        <section>
          <Topics />
        </section>
        <section>
          <Instructor />
        </section>
      </div>

      <footer className="mt-6 border-t border-grayscale-200 pt-5">
        <p className="text-body-s text-grayscale-500">0 Filters Active</p>
      </footer>
    </aside>
  );
}
