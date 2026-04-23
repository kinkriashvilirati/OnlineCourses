import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
export function FIlterSectionHeader({
  setIsOpen,
  isOpen,
  title,
}: {
  setIsOpen: (isOpen: boolean) => void;
  isOpen: boolean;
  title: string;
}) {
  return (
    <p
      className="tablet:pointer-events-none text-body-m text-grayscale-500  max-tablet:cursor-pointer max-tablet:hover:text-grayscale-500 duration-300 transition-all"
      onClick={() => setIsOpen(!isOpen)}
    >
      {title}{" "}
      <FontAwesomeIcon
        icon={faChevronDown}
        className={`tablet:hidden! transition-transform duration-300 ease-in-out ${
          isOpen ? "rotate-180" : "rotate-0"
        }`}
      />
    </p>
  );
}
export function FIlterSectionItemsContainer({
  isOpen,
  children,
}: {
  isOpen: boolean;
  children: React.ReactNode;
}) {
  return (
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
        <div>{children}</div>
      </div>
    </div>
  );
}
