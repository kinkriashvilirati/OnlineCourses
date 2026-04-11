import { faX } from "@fortawesome/free-solid-svg-icons";
import Categories from "./filter-sections/Categories";
import Instructor from "./filter-sections/Instructor";
import Topics from "./filter-sections/Topics";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export default function Filters() {
  return (
    <>
      <header>
        <h2>Filter</h2>
        <button>
          Clear All Filters <FontAwesomeIcon icon={faX} />
        </button>
      </header>
      <div>
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
      <footer>
        <p>0 Filters Activate</p>
      </footer>
    </>
  );
}
